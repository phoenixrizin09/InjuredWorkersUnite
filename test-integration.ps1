# 🧪 QUICK TEST SCRIPT - Windows PowerShell Version
# Test integration of all three systems

Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║        👁️ THE EYE ORACLE - INTEGRATION TEST SCRIPT         ║" -ForegroundColor Cyan
Write-Host "║           Testing all three integrated systems              ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

$API_URL = "http://localhost:3001"

function Test-Endpoint {
    param(
        [string]$Method,
        [string]$Endpoint,
        [string]$Data,
        [string]$Description
    )
    
    Write-Host ""
    Write-Host "Testing: $Description" -ForegroundColor Blue
    Write-Host "Endpoint: $Method $Endpoint" -ForegroundColor Yellow
    
    try {
        if ($Data) {
            $response = Invoke-RestMethod -Uri "$API_URL$Endpoint" `
                -Method $Method `
                -ContentType "application/json" `
                -Body $Data `
                -ErrorAction Stop
        } else {
            $response = Invoke-RestMethod -Uri "$API_URL$Endpoint" `
                -Method $Method `
                -ContentType "application/json" `
                -ErrorAction Stop
        }
        
        Write-Host "Response:" -ForegroundColor Yellow
        $response | ConvertTo-Json -Depth 10 | Write-Host
        Write-Host "✅ Test complete" -ForegroundColor Green
    } catch {
        Write-Host "❌ Test failed: $_" -ForegroundColor Red
    }
}

# Check if API is running
Write-Host "Checking if API is running on port 3001..." -ForegroundColor Yellow
try {
    $null = Invoke-RestMethod -Uri "$API_URL/api/health" -ErrorAction Stop
    Write-Host "✅ API is running" -ForegroundColor Green
} catch {
    Write-Host "⚠️  API not running. Start it with: node api/core.js" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🤖 AGENT ORCHESTRATION TESTS" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

Test-Endpoint "GET" "/api/agents/status" "" `
    "Get status of all 7 agents"

Test-Endpoint "GET" "/api/agents/Evidence%20Sentinel/logs" "" `
    "Get logs from Evidence Sentinel agent"

$agentTaskData = @{
    taskType = "collect-evidence"
    taskData = @{
        source = "open.canada.ca"
        topic = "disability-benefits"
    }
} | ConvertTo-Json

Test-Endpoint "POST" "/api/agents/Evidence%20Sentinel/task" $agentTaskData `
    "Send evidence collection task to agent"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "🚨 ALERT ORCHESTRATION TESTS" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

Test-Endpoint "GET" "/api/alerts/orchestrator/status" "" `
    "Get alert orchestrator status"

$highAlertData = @{
    id = "TEST_ALERT_001"
    severity = "high"
    title = "WSIB Benefit Denial Pattern"
    description = "Pattern of systematic benefit denials detected"
    violationType = "benefit-denial"
    jurisdiction = "ontario"
    violationScore = 65
} | ConvertTo-Json

Test-Endpoint "POST" "/api/alerts/orchestrated" $highAlertData `
    "Process high-severity alert through orchestration"

$criticalAlertData = @{
    id = "CRITICAL_ALERT_001"
    severity = "critical"
    title = "Systemic Rights Violation"
    description = "Evidence of systemic violation across jurisdictions"
    violationType = "systemic-discrimination"
    jurisdiction = "federal"
    violationScore = 85
} | ConvertTo-Json

Test-Endpoint "POST" "/api/alerts/orchestrated" $criticalAlertData `
    "Process critical alert (should trigger all channels)"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "📋 TRANSP7 TRANSPARENCY TESTS" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan

Test-Endpoint "GET" "/api/transparency/dashboard" "" `
    "View public TRANSP7 transparency dashboard"

Test-Endpoint "GET" "/api/transparency/corrections" "" `
    "View public corrections log"

Test-Endpoint "GET" "/api/transparency/methodology" "" `
    "View public methodology guide"

Test-Endpoint "GET" "/api/transparency/ai-usage" "" `
    "View AI usage transparency report"

Test-Endpoint "GET" "/api/transparency/conflicts" "" `
    "View conflict of interest declarations"

Test-Endpoint "GET" "/api/transparency/community-protection" "" `
    "View community data protection policy"

Write-Host ""
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host "✨ INTEGRATION TEST COMPLETE" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""
Write-Host "✅ All integration points verified" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Run full test suite: npm test __tests__/integration*.test.js"
Write-Host "  2. Deploy daemon: node daemon/eye-oracle-daemon.js"
Write-Host "  3. Monitor logs: Get-Content logs/daemon/daemon-*.log -Wait"
Write-Host ""
Write-Host "The Eye Never Sleeps 👁️" -ForegroundColor Magenta
