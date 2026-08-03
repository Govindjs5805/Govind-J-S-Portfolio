const { execSync } = require('child_process');
function run(cmd){
  console.log('> ', cmd);
  try{
    const out = execSync(cmd, { stdio: 'pipe' }).toString();
    console.log(out);
    return out;
  }catch(e){
    const sOut = (e.stdout || '').toString();
    const sErr = (e.stderr || '').toString();
    console.error('Command failed:', cmd);
    console.error(sOut);
    console.error(sErr);
    throw e;
  }
}

try{
  run('git fetch origin');
  try{
    run('git rebase origin/main');
    console.log('Rebase completed without conflicts.');
  }catch(e){
    console.log('Rebase reported conflicts. Attempting to resolve by choosing local (ours) versions...');
    // loop to resolve conflicts until rebase completes or max attempts
    for(let attempt=0; attempt<10; attempt++){
      const unmerged = execSync('git ls-files -u', { encoding: 'utf8' }).trim();
      if(!unmerged){
        console.log('No unmerged files found. Trying to continue rebase.');
        run('git rebase --continue');
        break;
      }
      const files = new Set();
      unmerged.split('\n').forEach(line=>{
        const cols = line.trim().split(/\s+/);
        const file = cols[3];
        if(file) files.add(file);
      });
      if(files.size===0){
        console.log('No files parsed from git ls-files -u. Aborting.');
        run('git rebase --abort');
        process.exit(1);
      }
      for(const f of files){
        console.log('Resolving', f, '-> keep local (ours)');
        run(`git checkout --ours -- "${f}"`);
        run(`git add "${f}"`);
      }
      try{
        run('git rebase --continue');
      }catch(err){
        // continue next iteration to resolve next set
        continue;
      }
      // if we got here, rebase continued; check if more conflicts
      const still = execSync('git ls-files -u', { encoding: 'utf8' }).trim();
      if(!still){
        console.log('Rebase conflicts resolved.');
        break;
      }
    }
  }
  console.log('Pushing to origin main...');
  run('git push -u origin main');
  console.log('Done.');
}catch(e){
  console.error('Failed to auto-resolve rebase:', e.message || e);
  process.exit(1);
}
