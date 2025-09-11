const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Netlify deployment configuration...\n');

// Check if required files exist
const requiredFiles = [
  'frontend/public/_redirects',
  'frontend/public/404.html',
  'netlify.toml',
  'frontend/.env.production'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log('✅', file, 'exists');
  } else {
    console.log('❌', file, 'missing');
    allFilesExist = false;
  }
});

// Check netlify.toml configuration
console.log('\n🔧 Checking netlify.toml configuration...');
try {
  const netlifyConfig = fs.readFileSync(path.join(__dirname, 'netlify.toml'), 'utf8');
  
  if (netlifyConfig.includes('frontend/build')) {
    console.log('✅ Publish directory correctly set to frontend/build');
  } else {
    console.log('❌ Publish directory not correctly configured');
  }
  
  if (netlifyConfig.includes('CI=false npm run build')) {
    console.log('✅ Build command correctly configured');
  } else {
    console.log('❌ Build command not correctly configured');
  }
  
  if (netlifyConfig.includes('from = "/*"') && netlifyConfig.includes('to = "/index.html"')) {
    console.log('✅ SPA redirect rule configured');
  } else {
    console.log('❌ SPA redirect rule missing');
  }
} catch (error) {
  console.log('❌ Error reading netlify.toml:', error.message);
}

// Check package.json
console.log('\n📦 Checking package.json...');
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'frontend/package.json'), 'utf8'));
  
  if (packageJson.homepage === '.') {
    console.log('✅ Homepage set to relative path');
  } else {
    console.log('❌ Homepage not set to relative path');
  }
  
  if (packageJson.scripts['build:netlify']) {
    console.log('✅ Netlify build script available');
  } else {
    console.log('⚠️  Netlify build script not found (optional)');
  }
} catch (error) {
  console.log('❌ Error reading package.json:', error.message);
}

console.log('\n' + '='.repeat(50));
if (allFilesExist) {
  console.log('🎉 All required files are present!');
  console.log('📋 Next steps:');
  console.log('   1. Update REACT_APP_API_URL in netlify.toml');
  console.log('   2. Deploy to Netlify');
  console.log('   3. Configure custom domain (optional)');
} else {
  console.log('⚠️  Some required files are missing. Please check the list above.');
}
console.log('='.repeat(50));