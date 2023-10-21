import WormholeBridge from "@wormhole-foundation/wormhole-connect";
import dynamic from "next/dynamic";
function App() {
  return <WormholeBridge />;
}

export default dynamic(() => Promise.resolve(App), { ssr: false });
