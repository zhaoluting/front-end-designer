import AV from 'leancloud-storage';

const APP_ID = 'jtP7IlVD1aOBkUvgoue8BsWG-gzGzoHsz';
const APP_KEY = 'SQbJtem0VkQlb1VGc4RiaI2u';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
});

export default AV;
