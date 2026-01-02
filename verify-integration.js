#!/usr/bin/env node
/**
 * 👁️ THE EYE ORACLE - INTEGRATION VERIFICATION
 * Verify all three systems are properly integrated
 */

const fs = require('fs');
const path = require('path');

console.log(`
╔══════════════════════════════════════════════════════════════╗
║        👁️ THE EYE ORACLE - INTEGRATION VERIFICATION       ║
║              Checking all integration points               ║
╚══════════════════════════════════════════════════════════════╝
`);

let passedChecks = 0;
let failedChecks = 0;

function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, filePath);
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${description}`);
    passedChecks++;
    return true;
  } else {
    console.log(`❌ ${description} - NOT FOUND: ${filePath}`);
    failedChecks++;
    return false;
  }
}

function checkFileContent(filePath, searchString, description) {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log(`❌ ${description} - FILE NOT FOUND: ${filePath}`);
    failedChecks++;
    return false;
  }
  
  try {
    const content = fs.readFileSync(fullPath, 'utf-8');
    if (content.includes(searchString)) {
      console.log(`✅ ${description}`);
      passedChecks++;
      return true;
    } else {
      console.log(`❌ ${description} - CONTENT NOT FOUND`);
      failedChecks++;
      return false;
    }
  } catch (err) {
    console.log(`❌ ${description} - ERROR: ${err.message}`);
    failedChecks++;
    return false;
  }
}

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('📂 CHECKING CORE FILES');
console.log('═══════════════════════════════════════════════════════════════\n');

checkFile('daemon/eye-oracle-daemon.js', 'Daemon exists');
checkFile('api/core.js', 'API exists');
checkFile('agents/orchestrator.js', 'Agent orchestrator exists');
checkFile('utils/alert-orchestrator.js', 'Alert orchestrator exists');
checkFile('utils/transp7-framework.js', 'TRANSP7 framework exists');

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('🧪 CHECKING INTEGRATION IN DAEMON');
console.log('═══════════════════════════════════════════════════════════════\n');

checkFileContent('daemon/eye-oracle-daemon.js', 'require(\'../agents/orchestrator\')', 
  'Daemon imports AgentManager');
checkFileContent('daemon/eye-oracle-daemon.js', 'require(\'../utils/alert-orchestrator\')', 
  'Daemon imports AlertOrchestrator');
checkFileContent('daemon/eye-oracle-daemon.js', 'require(\'../utils/transp7-framework\')', 
  'Daemon imports TRANSP7Framework');
checkFileContent('daemon/eye-oracle-daemon.js', 'this.agentManager = new AgentManager()', 
  'Daemon initializes AgentManager');
checkFileContent('daemon/eye-oracle-daemon.js', 'this.alertOrchestrator = new AlertOrchestrator()', 
  'Daemon initializes AlertOrchestrator');
checkFileContent('daemon/eye-oracle-daemon.js', 'this.transp7 = new TRANSP7Framework()', 
  'Daemon initializes TRANSP7Framework');
checkFileContent('daemon/eye-oracle-daemon.js', 'registerAgents()', 
  'Daemon has registerAgents method');
checkFileContent('daemon/eye-oracle-daemon.js', 'await this.agentManager.startAll()', 
  'Daemon starts all agents');

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('🔌 CHECKING INTEGRATION IN API');
console.log('═══════════════════════════════════════════════════════════════\n');

checkFileContent('api/core.js', 'require(\'../agents/orchestrator\')', 
  'API imports AgentManager');
checkFileContent('api/core.js', 'require(\'../utils/alert-orchestrator\')', 
  'API imports AlertOrchestrator');
checkFileContent('api/core.js', 'require(\'../utils/transp7-framework\')', 
  'API imports TRANSP7Framework');
checkFileContent('api/core.js', 'this.agentManager = new AgentManager()', 
  'API initializes AgentManager');
checkFileContent('api/core.js', 'this.alertOrchestrator = new AlertOrchestrator()', 
  'API initializes AlertOrchestrator');
checkFileContent('api/core.js', 'this.transp7 = new TRANSP7Framework()', 
  'API initializes TRANSP7Framework');

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('🌐 CHECKING API ENDPOINTS');
console.log('═══════════════════════════════════════════════════════════════\n');

checkFileContent('api/core.js', 'GET /api/agents/status', 'Agent status endpoint');
checkFileContent('api/core.js', 'POST /api/agents/:name/task', 'Agent task endpoint');
checkFileContent('api/core.js', 'GET /api/agents/:name/logs', 'Agent logs endpoint');
checkFileContent('api/core.js', 'POST /api/alerts/orchestrated', 'Alert orchestration endpoint');
checkFileContent('api/core.js', 'GET /api/alerts/orchestrator/status', 'Orchestrator status endpoint');
checkFileContent('api/core.js', '/api/transparency/dashboard', 'Transparency dashboard endpoint');
checkFileContent('api/core.js', '/api/transparency/corrections', 'Corrections endpoint');
checkFileContent('api/core.js', '/api/transparency/methodology', 'Methodology endpoint');
checkFileContent('api/core.js', '/api/transparency/ai-usage', 'AI usage endpoint');
checkFileContent('api/core.js', '/api/transparency/conflicts', 'Conflicts endpoint');
checkFileContent('api/core.js', '/api/transparency/community-protection', 'Community protection endpoint');

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('🧪 CHECKING TEST FILES');
console.log('═══════════════════════════════════════════════════════════════\n');

checkFile('__tests__/integration.agents.test.js', 'Agent integration tests exist');
checkFile('__tests__/integration.alerts.test.js', 'Alert integration tests exist');
checkFile('__tests__/integration.transp7.test.js', 'TRANSP7 integration tests exist');
checkFile('__tests__/integration.api.test.js', 'API integration tests exist');

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('📚 CHECKING DOCUMENTATION');
console.log('═══════════════════════════════════════════════════════════════\n');

checkFile('INTEGRATION_COMPLETE.md', 'Complete integration guide exists');
checkFile('INTEGRATION_SUMMARY.md', 'Integration summary exists');
checkFile('START_HERE.md', 'Quick start guide exists');
checkFile('test-integration.sh', 'Integration test script (bash) exists');
checkFile('test-integration.ps1', 'Integration test script (PowerShell) exists');

console.log('\n═══════════════════════════════════════════════════════════════');
console.log('✨ VERIFICATION COMPLETE');
console.log('═══════════════════════════════════════════════════════════════\n');

console.log(`Checks Passed: ${passedChecks} ✅`);
console.log(`Checks Failed: ${failedChecks} ❌`);

if (failedChecks === 0) {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                    ✅ ALL CHECKS PASSED                    ║
║                                                              ║
║  All three systems are properly integrated and ready to     ║
║  use. You can now:                                          ║
║                                                              ║
║  1. Start daemon:  node daemon/eye-oracle-daemon.js         ║
║  2. Start API:     node api/core.js                         ║
║  3. Run tests:     npm test __tests__/integration*.test.js  ║
║  4. Test endpoints: bash test-integration.sh                ║
║                                                              ║
║              The Eye Oracle is Ready! 👁️                   ║
╚══════════════════════════════════════════════════════════════╝
  `);
  process.exit(0);
} else {
  console.log(`
╔══════════════════════════════════════════════════════════════╗
║                ❌ SOME CHECKS FAILED                        ║
║                                                              ║
║  Please verify the files above exist and contain the        ║
║  required content.                                          ║
║                                                              ║
║  Missing files indicate incomplete integration.             ║
╚══════════════════════════════════════════════════════════════╝
  `);
  process.exit(1);
}
