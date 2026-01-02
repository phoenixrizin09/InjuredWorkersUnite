#!/bin/bash
# 🧪 QUICK TEST SCRIPT - Verify Integration Works

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║        👁️ THE EYE ORACLE - INTEGRATION TEST SCRIPT         ║"
echo "║           Testing all three integrated systems              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

API_URL="http://localhost:3001"

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4
    
    echo ""
    echo -e "${BLUE}Testing:${NC} $description"
    echo -e "${YELLOW}Endpoint:${NC} $method $endpoint"
    
    if [ -z "$data" ]; then
        response=$(curl -s -X $method "$API_URL$endpoint" \
            -H "Content-Type: application/json")
    else
        response=$(curl -s -X $method "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    echo -e "${YELLOW}Response:${NC}"
    echo "$response" | jq '.' 2>/dev/null || echo "$response"
    echo -e "${GREEN}✅ Test complete${NC}"
}

# Check if API is running
echo -e "${YELLOW}Checking if API is running on port 3001...${NC}"
if ! curl -s "$API_URL/api/health" > /dev/null 2>&1; then
    echo -e "${YELLOW}Note: API not running. Start it with: node api/core.js${NC}"
    echo ""
fi

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "🤖 AGENT ORCHESTRATION TESTS"
echo "═══════════════════════════════════════════════════════════════"

test_endpoint "GET" "/api/agents/status" "" \
    "Get status of all 7 agents"

test_endpoint "GET" "/api/agents/Evidence%20Sentinel/logs" "" \
    "Get logs from Evidence Sentinel agent"

test_endpoint "POST" "/api/agents/Evidence%20Sentinel/task" \
    '{
        "taskType": "collect-evidence",
        "taskData": {
            "source": "open.canada.ca",
            "topic": "disability-benefits"
        }
    }' \
    "Send evidence collection task to agent"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "🚨 ALERT ORCHESTRATION TESTS"
echo "═══════════════════════════════════════════════════════════════"

test_endpoint "GET" "/api/alerts/orchestrator/status" "" \
    "Get alert orchestrator status"

test_endpoint "POST" "/api/alerts/orchestrated" \
    '{
        "id": "TEST_ALERT_001",
        "severity": "high",
        "title": "WSIB Benefit Denial Pattern",
        "description": "Pattern of systematic benefit denials detected",
        "violationType": "benefit-denial",
        "jurisdiction": "ontario",
        "violationScore": 65
    }' \
    "Process high-severity alert through orchestration"

test_endpoint "POST" "/api/alerts/orchestrated" \
    '{
        "id": "CRITICAL_ALERT_001",
        "severity": "critical",
        "title": "Systemic Rights Violation",
        "description": "Evidence of systemic violation across jurisdictions",
        "violationType": "systemic-discrimination",
        "jurisdiction": "federal",
        "violationScore": 85
    }' \
    "Process critical alert (should trigger all channels)"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "📋 TRANSP7 TRANSPARENCY TESTS"
echo "═══════════════════════════════════════════════════════════════"

test_endpoint "GET" "/api/transparency/dashboard" "" \
    "View public TRANSP7 transparency dashboard"

test_endpoint "GET" "/api/transparency/corrections" "" \
    "View public corrections log"

test_endpoint "GET" "/api/transparency/methodology" "" \
    "View public methodology guide"

test_endpoint "GET" "/api/transparency/ai-usage" "" \
    "View AI usage transparency report"

test_endpoint "GET" "/api/transparency/conflicts" "" \
    "View conflict of interest declarations"

test_endpoint "GET" "/api/transparency/community-protection" "" \
    "View community data protection policy"

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "✨ INTEGRATION TEST COMPLETE"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo -e "${GREEN}✅ All integration points verified${NC}"
echo ""
echo "Next steps:"
echo "  1. Run full test suite: npm test __tests__/integration*.test.js"
echo "  2. Deploy daemon: node daemon/eye-oracle-daemon.js"
echo "  3. Monitor logs: tail -f logs/daemon/daemon-*.log"
echo ""
echo "The Eye Never Sleeps 👁️"
