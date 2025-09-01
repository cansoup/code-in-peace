const Project = () => {
    return (
        <div className="p-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                <div className="bg-white border-gray-200 p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">반응형 웹사이트</h3>
                    <p className="text-gray-500">React와 Tailwind CSS를 활용한 개인 포트폴리오입니다.</p>
                </div>
                <div className="bg-white border-gray-200 p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">실시간 채팅 앱</h3>
                    <p className="text-gray-500">Firebase를 이용한 실시간 채팅 애플리케이션입니다.</p>
                </div>
                <div className="bg-white border-gray-200 p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">날씨 정보 서비스</h3>
                    <p className="text-gray-500">외부 API를 활용하여 실시간 날씨 정보를 제공합니다.</p>
                </div>
                <div className="bg-white border-gray-200 p-6">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">Todo 리스트 앱</h3>
                    <p className="text-gray-500">간단한 할 일 관리 웹 애플리케이션입니다.</p>
                </div>
            </div>
        </div>
    )
}

export default Project;
