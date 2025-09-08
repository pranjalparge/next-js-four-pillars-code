

// const chromeLauncher = require('chrome-launcher');
const express = require("express");
// const getAuditReport = (req, res) => {
//     res.json({
//       Performance: {
//         score: 50,
//         color: 'orange'
//       },
//       Accessibility: {
//         score: 76,
//         color: 'orange'
//       },
//       'Best Practices': {
//         score: 100,
//         color: 'green'
//       },
//       SEO: {
//         score: 91,
//         color: 'green'
//       }
//     });
//   };
  
//   module.exports = { getAuditReport };

  





  // const getColor = (score) => {
  //   if (score >= 90) return 'green';
  //   if (score >= 50) return 'orange';
  //   return 'red';
  // };
  
  // const getAuditReport = async (req, res) => {
  //   const url = req.query.url;
  
  //   if (!url) {
  //     return res.status(400).json({ error: 'URL is required in query parameter.' });
  //   }
  
  //   try {
  //     // ✅ Dynamically import ESM-only modules inside CommonJS
  //     const chromeLauncherModule = await import('chrome-launcher');
  //     const lighthouseModule = await import('lighthouse');
  
  //     const chrome = await chromeLauncherModule.launch({ chromeFlags: ['--headless'] });
  
  //     const options = {
  //       logLevel: 'info',
  //       output: 'json',
  //       onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  //       port: chrome.port,
  //       disableStorageReset: true,
  //     };
  
  //     const runnerResult = await lighthouseModule.default(url, options);
  //     const { categories } = runnerResult.lhr;
  
  //     await chrome.kill();
  
  //     const format = (category) => {
  //       const score = Math.round(categories[category].score * 100);
  //       return { score, color: getColor(score) };
  //     };
  
  //     res.json({
  //       Performance: format('performance'),
  //       Accessibility: format('accessibility'),
  //       'Best Practices': format('best-practices'),
  //       SEO: format('seo'),
  //     });
  
  //   } catch (err) {
  //     console.error('[Lighthouse Error]', err);
  //     res.status(500).json({
  //       error: 'Failed to generate audit report',
  //       details: err.message,
  //     });
  //   }
  // };
  
  // module.exports = { getAuditReport };
  

  const fs = require('fs');
const path = require('path');
const os = require('os');

const getColor = (score) => {
  if (score >= 90) return 'green';
  if (score >= 50) return 'orange';
  return 'red';
};

const getAuditReport = async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'URL is required in query parameter.' });
  }

  // ✅ Use custom temp directory for Chrome profile to avoid file lock issues
  const userDataDir = path.join(os.tmpdir(), 'lighthouse-profile');

  try {
    // Create the user data dir if it doesn't exist
    if (!fs.existsSync(userDataDir)) {
      fs.mkdirSync(userDataDir);
    }

    // Dynamically import ESM-only modules
    const chromeLauncherModule = await import('chrome-launcher');
    const lighthouseModule = await import('lighthouse');

    const chrome = await chromeLauncherModule.launch({
      chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        `--user-data-dir=${userDataDir}`,
      ],
    });

    const options = {
      logLevel: 'info',
      output: 'json',
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      port: chrome.port,
      disableStorageReset: true, // ✅ Avoid errors related to browser cache clearing
    };

    const runnerResult = await lighthouseModule.default(url, options);
    const { categories } = runnerResult.lhr;

    await chrome.kill();

    // Clean up user data directory
    fs.rmSync(userDataDir, { recursive: true, force: true });

    const format = (category) => {
      const score = Math.round(categories[category].score * 100);
      return { score, color: getColor(score) };
    };

    res.json({
      Performance: format('performance'),
      Accessibility: format('accessibility'),
      'Best Practices': format('best-practices'),
      SEO: format('seo'),
    });

  } catch (err) {
    console.error('[Lighthouse Error]', err);

    // Cleanup if chrome failed to launch or crashed early
    if (fs.existsSync(userDataDir)) {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    }

    res.status(500).json({
      error: 'Failed to generate audit report',
      details: err.message,
    });
  }
};

module.exports = { getAuditReport };
