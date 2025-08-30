import { useMe } from "@/hooks/useMe";
import LogoutButton from "@/components/LogoutButton";

export default function Home() {
  const { data } = useMe(); // 보호 라우트 통과 후라면 항상 존재
  return (
    <div className="p-6 space-y-3">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">대시보드</h1>
        <LogoutButton />
      </div>
      <pre className="bg-gray-100 p-3 text-xs overflow-auto rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
