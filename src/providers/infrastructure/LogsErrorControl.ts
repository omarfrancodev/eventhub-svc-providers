import fs from 'fs';
function saveErrorToLogFile(error: unknown, errorLine: string) {
  try {
    const currentDate = new Date();
    const formattedFullDate = currentDate.toLocaleString();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
    const logFileName = `error-logs-${formattedDate}.log`;
    const logFilePath = `src/logs/${logFileName}`;
    const logMessage = `${formattedFullDate}    ${error}\n${errorLine}`;
    if (!fs.existsSync(logFilePath)) {
      fs.writeFileSync(logFilePath, logMessage);
    } else {
      fs.appendFileSync(logFilePath, logMessage);
    }
  } catch (error) {
    console.error('Error saving error to log file:', error);
  }
}

function saveLogFile(error: any) {
  const stackLines = error.stack.split("\n");
  let errorLine = '';
  for (const line of stackLines) {
    errorLine += line + "\n";
  }
  saveErrorToLogFile(error, errorLine);
}

export default saveLogFile;