import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from "@mysten/dapp-kit";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { COUNTER_PACKAGE_ID } from "./constants";

export function CreateCounter(props: { onCreated: (id: string) => void }) {
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();
  return (
    <div  style={{ marginTop: "20px" }}>
      <button
        onClick={() => {
          create();
        }}
      >
        Create Counter
      </button>
    </div>
  );

  function create() {
    const txb = new TransactionBlock();
    txb.moveCall({
      arguments: [],
      target: `${COUNTER_PACKAGE_ID}::counter::create`,
    });
    signAndExecute({
      transactionBlock: txb,
      options: {
        showEffects: true,
      },
    },{
      onError(error) {
        console.error("executeMoveCall onError", error);
      },
      onSuccess(data) {
        console.log("executeMoveCall onSuccess", data);
        suiClient.waitForTransactionBlock({ digest: data.digest }).then(() => {
          const objectId = data.effects?.created?.[0]?.reference?.objectId;
          if (objectId) {
            props.onCreated(objectId);
          }
        });
      },
    });
  }
}
