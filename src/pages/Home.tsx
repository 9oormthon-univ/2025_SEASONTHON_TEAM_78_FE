import Header from "../components/Header";
import Card from "../components/Card";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card title="첫 번째 카드" description="설명 텍스트 1" />
                <Card title="두 번째 카드" description="설명 텍스트 2" />
                <Card title="세 번째 카드" description="설명 텍스트 3" />
            </main>

            <Footer />
        </div>
    );
}
