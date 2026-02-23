import { Response, Request, NextFunction } from "express" 
import { ValidationError } from "../exception"
import { addSSEClient, removeSSEClient } from "../pubsub/sse"

export async function getEvents(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { channel } = req.query as {channel: string}

    console.log('Channel:', channel);

    if(!channel) {
        throw new ValidationError('Channel is required, cannot detect one', { channel: channel });
    }

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')
    res.flushHeaders()
    
    addSSEClient(channel, res)
    
    // Keet check if the client is still connected to the server.
    const keepalive = setInterval(() => {
      try {
        res.write(': keep-alive\n\n')
      } catch {
        clearInterval(keepalive)
      }
    }, 15000)

    req.on('close', () => {
        console.log('Nodejs disconnected client from channel:', channel);
        clearInterval(keepalive)
        removeSSEClient(channel, res)
    })  

}