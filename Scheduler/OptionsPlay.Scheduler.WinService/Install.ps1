function Get-FrameworkDirectory()
{
    $([System.Runtime.InteropServices.RuntimeEnvironment]::GetRuntimeDirectory())
}

$frameworkDir = Get-FrameworkDirectory
Write-Output $frameworkDir
$serviceLocation = "C:\Users\Administrator\Source\Workspaces\OptionsPlayFC\Scheduler\OptionsPlay.Scheduler.WinService\bin\Release\OptionsPlay.Scheduler.WinService.exe"

$installUtil = $frameworkDir + "InstallUtil"
Write-Output $installUtil
$command = $installUtil + " " + $serviceLocation
Write-Output $command
iex $command

Start-Service "OptionsPlay.SchedulerService"