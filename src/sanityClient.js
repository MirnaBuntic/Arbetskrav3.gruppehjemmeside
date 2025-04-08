import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: 'nhz2b76i',         
  dataset: 'production',         
  apiVersion: '2023-01-01', 
  useCdn: false,
});

export default sanityClient;
