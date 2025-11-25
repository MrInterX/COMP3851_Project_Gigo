import presetJobs from './presetJobs';

const remoteJobs = presetJobs.filter(
  (job) => job.workplace_type?.toLowerCase() === 'remote'
);

export default remoteJobs;
