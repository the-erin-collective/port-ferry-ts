const express = require('express');
import { Request, Response, NextFunction } from 'express';
const proxy = require('express-http-proxy');
import * as StatusHandler from './StatusHandler';
import * as ErrorLogger from './ErrorLogger';
import * as FileHandler from './FileHandler';
import * as DateHelper from './DateHelper';

const app = express();
const config = FileHandler.readJSONFileSync('appConfig.json');

try 
{
  app.use(express.json());
  app.use(express.raw());
  app.use(express.text());
  
  app.use((req: any, res:any, next:any) => {
    if (req.body) {
      req['parsedBody'] = req.body; // Store parsed body so we can re-read it later
    }
    next();
  });
  
  const portMappings = FileHandler.readJSONFileSync(config.portMappings);
  console.log(`portMappings: ${JSON.stringify(portMappings)}`);

  for (const [route, target] of Object.entries(portMappings)) {
    app.use(route, proxy(target, {
      userResDecorator: (proxyRes: any, proxyResData: any, userReq: any, userRes: any) => {
        console.log(`[${DateHelper.getCurrentDateTime()}] status code: ${proxyRes.statusCode}, route: ${route}`);

        StatusHandler.handleStatusCode(proxyRes.statusCode, userReq, config);
        return proxyResData;
      },
      proxyErrorHandler: (err: any, res: Response, next: NextFunction) => {
        const req = (res as any).req as Request;
        ErrorLogger.handleProxyError(err, config, req);
        res.status(502).json({ error: 'bad_gateway', reason: 'Proxy Error' });
        next();
      }
    }));
  }

 // Catch-all middleware to let other requests pass through
 app.use((req: Request, res: Response, next: NextFunction) => {
    next();
  });

  app.listen(config.listenPort, () => {
    console.log(`Proxy running on http://localhost:${config.listenPort}/`);
  });

} catch (error) {  
  console.log(error);
  if (error instanceof Error) {
    FileHandler.writeToFile(`Initialization error: ${error.message}`, config.internalErrorLogs);
  }
}