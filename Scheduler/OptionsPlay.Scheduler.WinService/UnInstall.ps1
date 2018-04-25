Stop-Service "OptionsPlay.SchedulerService"

$service = Get-WmiObject -Class Win32_Service -Filter "Name='OptionsPlay.SchedulerService'"
$service.delete()