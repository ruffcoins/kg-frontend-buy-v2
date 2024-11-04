import InnerPageLayout from "@/components/layouts/InnerPageLayout";
import SalesPageLayout from "@/components/layouts/SalesPageLayout";

const page = ({ params }: { params: { saleName: string } }) => {
  const { saleName } = params;

  return (
    <InnerPageLayout saleName={saleName}>
      <SalesPageLayout saleName={saleName} />
    </InnerPageLayout>
  );
};
export default page;
