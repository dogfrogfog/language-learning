import PageTitle from "@/components/PageTitle";
import PasteWordArea from "@/components/PasteWordArea";
import InputWord from "@/components/InputWord";

export default function Page() {
  return (
    <div className="p-3">
      <PageTitle className="my-4" title="Home" />
      <div className="flex w-full gap-8 flex-col">
        <PasteWordArea />
        <InputWord />
      </div>
    </div>
  );
}
