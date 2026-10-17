const { Client } = require('ssh2');

class SSHService {
    /**
     * Executa um comando Linux direto na instância VPS
     */
    static executeCommand(host, password, command) {
        return new Promise((resolve, reject) => {
            const conn = new Client();

            conn.on('ready', () => {
                conn.exec(command, (err, stream) => {
                    if (err) {
                        conn.end();
                        return reject(err);
                    }

                    let output = '';
                    let errorOutput = '';

                    stream.on('close', (code, signal) => {
                        conn.end();
                        resolve({ code, output, errorOutput });
                    }).on('data', (data) => {
                        output += data.toString();
                    }).stderr.on('data', (data) => {
                        errorOutput += data.toString();
                    });
                });
            }).on('error', (err) => {
                reject(err);
            }).connect({
                host: host,
                port: 22,
                username: 'root',
                password: password,
                readyTimeout: 10000
            });
        });
    }

    // Comandos rápidos de infraestrutura
    static async rebootServer(ipAddress, rootPassword) {
        return this.executeCommand(ipAddress, rootPassword, 'sudo reboot');
    }

    static async shutdownServer(ipAddress, rootPassword) {
        return this.executeCommand(ipAddress, rootPassword, 'sudo shutdown -h now');
    }

    // Leitura leve de CPU e RAM para desenhar nos gráficos do painel
    static async getSystemMetrics(ipAddress, rootPassword) {
        const cmd = "top -bn1 | grep 'Cpu(s)' | awk '{print $2}' && free -m | awk 'NR==2{printf \"%.2f\", $3*100/$2 }'";
        try {
            const result = await this.executeCommand(ipAddress, rootPassword, cmd);
            const metrics = result.output.trim().split('\n');
            return {
                success: true,
                cpuUsagePercent: parseFloat(metrics[0]) || 0,
                ramUsagePercent: parseFloat(metrics[1]) || 0
            };
        } catch (error) {
            return { success: false, error: 'Failed to communicate with guest agent.' };
        }
    }
}

module.exports = SSHService;
