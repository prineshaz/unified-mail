import { Response } from "express"

const sseClient = new Map<string, Set<Response>>()

export function addSSEClient(channel: string, res: Response): void  {
    if(!sseClient.has(channel)) {
        sseClient.set(channel, new Set())
    }
    sseClient.get(channel)?.add(res)
}

export function removeSSEClient(channel: string, res: Response): void  {
    if(sseClient.has(channel)) {
        sseClient.delete(channel)
    }
}

export function broadcastToChannel(channel: string, data: string | object): void {
    const payload = typeof data === 'string' ? data : JSON.stringify(data);
    const clients = sseClient.get(channel);
    if (!clients) return;
    const dead: Response[] = [];
    clients.forEach((res) => {
      try {
        res.write(`data: ${payload}\n\n`);
      } catch {
        dead.push(res);
      }
    });
    dead.forEach((res) => removeSSEClient(channel, res))
}