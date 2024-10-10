/** @type {import('next').NextConfig} */
import { exec } from 'child_process';
import path from 'path';

const nextConfig = {
  // Add your other configurations here (if any)
};

// Start cron job when the server starts
exec(`node ${path.join(process.cwd(), 'cronJob.js')}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting cron job: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`Cron job stderr: ${stderr}`);
    return;
  }
  console.log(`Cron job stdout: ${stdout}`);
});

export default nextConfig;
