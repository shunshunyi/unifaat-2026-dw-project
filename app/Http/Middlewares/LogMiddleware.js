import fs from "fs";
import path from "path";

/**
 * Middleware para logging de requisições.
 * 
 * Registra cada chamada feita à API em um arquivo de log e no console.
 * Formato: [data iso] Metodo :: Rota
 */
export default function LogMiddleware(request, response, next) {
    const now = new Date().toISOString();
    const method = request.method;
    const url = request.url;
    
    const logMessage = `[${now}] ${method} :: ${url}`;
    
    // Exibe no console
    console.log(logMessage);
    
    // Grava no arquivo ./storage/logs/log.txt
    const logFilePath = path.resolve(process.cwd(), "storage", "logs", "log.txt");
    
    try {
        fs.appendFileSync(logFilePath, logMessage + "\n");
    } catch (error) {
        console.error("Erro ao gravar log no arquivo:", error);
    }
    
    // Permite que a requisição continue
    next();
}
