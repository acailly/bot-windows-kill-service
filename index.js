const path = require("path");
const exec = require("child_process").exec;

module.exports = function (vorpal) {
  vorpal
    .command('kill windows service <service>')
    .description('Kill a windows service')
    .action(function (args, callback) {
      const serviceName = args.service
      const script = path.join(__dirname, "kill_service.ps1");
      const commandLine = `powershell.exe -Command "${script} -service ${serviceName}"`;
      this.log("Executing " + commandLine);

      exec(commandLine, (err, stdout, stderr) => {
          if (stdout) this.log(stdout);
          if (stderr) this.log(stderr);
          if (err) this.log(err);
        })
        .stdin.end();

      callback()
    })
}