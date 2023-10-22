import { Web3Storage } from "web3.storage";

function getAccessToken() {
  // If you're just testing, you can paste in a token
  // and uncomment the following line:
  // return 'paste-your-token-here'

  // In a real app, it's better to read an access token from an
  // environement variable or other configuration that's kept outside of
  // your code base. For this to work, you need to set the
  // WEB3STORAGE_TOKEN environment variable before you run your code.
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDM1MDYwZjFGNUI5NTBEMDkyNmNFZWExOTk4MzFDNjhiZWRGNDEyYzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2OTc5NjY0NjA1OTUsIm5hbWUiOiJNZWdhV2FsbGV0In0.hauhORWbPByxva3mLDDbN5ixZvNgJv6Hdq85h7p87PU";
  return process.env.WEB3STORAGE_TOKEN;
}

export function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() });
}
