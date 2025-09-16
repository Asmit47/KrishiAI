import React from 'react';

interface MarketplaceProps {
  language: 'en' | 'hi' | 'pa';
  onBack?: () => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ language, onBack }) => {
  const translations = {
    en: {
      title: 'Marketplace',
      bestPrices: 'Best Prices',
      orderRequests: 'Order Requests',
      requesting: 'Requesting',
      of: 'of',
      offer: 'Offer',
      accept: 'Accept',
      decline: 'Decline',
      search: 'Search',
      filter: 'Filter',
      ago: 'ago',
      timeAgo: (time: string) => `${time} ago`
    },
    hi: {
      title: 'मार्केटप्लेस',
      bestPrices: 'सर्वोत्तम मूल्य',
      orderRequests: 'आदेश अनुरोध',
      requesting: 'अनुरोध',
      of: 'का',
      offer: 'प्रस्ताव',
      accept: 'स्वीकार',
      decline: 'अस्वीकार',
      search: 'खोज',
      filter: 'फ़िल्टर',
      ago: 'पहले',
      timeAgo: (time: string) => `${time} पहले`
    },
    pa: {
      title: 'ਮਾਰਕੀਟਪਲੇਸ',
      bestPrices: 'ਸਭ ਤੋਂ ਵਧੀਆ ਕੀਮਤਾਂ',
      orderRequests: 'ਆਰਡਰ ਬੇਨਤੀਆਂ',
      requesting: 'ਬੇਨਤੀ',
      of: 'ਦਾ',
      offer: 'ਪੇਸ਼ਕਸ਼',
      accept: 'ਸਵੀਕਾਰ',
      decline: 'ਇਨਕਾਰ',
      search: 'ਖੋਜ',
      filter: 'ਫਿਲਟਰ',
      ago: 'ਪਹਿਲਾਂ',
      timeAgo: (time: string) => `${time} ਪਹਿਲਾਂ`
    }
  };

  const t = translations[language] || translations.en;

  const crops = [
    { name: 'Wheat', price: '2,350', change: '+2.5%', changePositive: true, icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8V5jwQPS46J-YIWAPVuwdPkQ9o6GgpdIcXvSfHm3pFSwOwxkfDgevktbFF9OOwkB8lNoKd8gaVVfbE-pOU0YM2CYlCIBCdVeP4WrA6o1bw6OBXeX8CVv66TbRUO0BPsMgsd4aRpFfMdlPWxVJZ6hdOB6gI0HBIbMpihztT4PiHRyMCi3KCZEuNxt-z09HzY7VmZVsLTP10YUeBkFE9n83rckdjUggQzve5AbSRCLN9mF3hhI4B0uly07k7spvv3gk0afFTq13zS4' },
    { name: 'Rice', price: '3,100', change: '-1.2%', changePositive: false, icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsDP8sDTcl_TTeSzzqSAb2iE5l7aQPJMQuwVQKP4uOeBqlHlNNpXNIPW5m4JAgBr_cNw-zYMOsfIn-6JVN-Gyt3YTFAy7MJeLGp8FkVMnSWlG-8VLFUEPaO4HZxmM43Lneakcc6_LcsyKf7rRaS0Pjr10Ly7OnsT8GHok3fCJtW_2m71tz_pIcqTPmrdG4ZrrUR7ObGQsetKJIKtLzzj-4-dSt3QplSVcUXiTBfQ4ji_cHdMp4uqGO07NkYiw32ddNlVRxsDCUqRI' },
    { name: 'Corn', price: '2,100', change: '+0.8%', changePositive: true, icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClwQQ5Si3TmVT1qt56R74YSoPnm6rc7MeTqBNdVsS6bp2U8HNj4XaSJTu_MAocR1Xm_miQiK3TWwHykMpBIrQyXtRZU9Bxeroh5VnRAt6CpxrYX-WWBeaXyuSQrPuoDVn0z258-TjYDpF9oXFm634kBX-JtqKl7urqpUyB9HJgkdMNJKsGxjRg5KF1W9Igk4NwHEGn1R0vIa-v-OYQkLC7xnCOsAvMGIiB2mDj4UDn2CzvwoYGK5QC6E9N9-1BSPkjZZLGjHY-zpk' },
    { name: 'Soybean', price: '4,500', change: '+3.1%', changePositive: true, icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0_enJXC4Q4m2aJDNwVItIMTYTirv7jg-aw_8wzIkFUtUjx0TfkQ53jHhAjD4z0iwxl64yyWPDzMT-cJcX5Y0BMjr91cwf1cAQ2BlWHukyVxfN-8wak0nYn7EirXSbmse9LXerG78Rt177iJy3XAsBbteQ153mbtSbHaZK3Uo313kKxltzFXEcPUgC7czosIqADn3d1_2mOGSIqFf_xwoYYHvbACdIQjMoueVw9vbjSCNOUBE7_2TpwdINX_ay-LJuSrz-ruTdD3M' }
  ];

  const orderRequests = [
    {
      company: 'Global Grains Ltd.',
      time: '2h',
      crop: 'Wheat',
      quantity: '50',
      price: '2,400',
      icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJlzCuVLzSeYzvnUlpQ4JU9zS8sPFl-Si0Wwtqw1vJIieuTQvrbpNj6FW05PLu4j0B6VQ5NsMslHr4cX43mp1paOzggPgXz0SzXAAmmMrW9OXPyeL4ZLaq5SREmJBT5IzbOcfQ500Ygj1WLudrfLyB7I1BwfY27I4ubSmM3bLzqH5dDhvyiuhymLQwknfzm-gBpQlhwtJ9s50o0RyFeOFRsTK9RHDez5PVv56ecvxwTrMjqc-7X5hlIN24ATlixm2ZPRzSGgLXEW4'
    },
    {
      company: 'Harvest Buyers Co.',
      time: '5h',
      crop: 'Rice',
      quantity: '100',
      price: '3,050',
      icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJlzCuVLzSeYzvnUlpQ4JU9zS8sPFl-Si0Wwtqw1vJIieuTQvrbpNj6FW05PLu4j0B6VQ5NsMslHr4cX43mp1paOzggPgXz0SzXAAmmMrW9OXPyeL4ZLaq5SREmJBT5IzbOcfQ500Ygj1WLudrfLyB7I1BwfY27I4ubSmM3bLzqH5dDhvyiuhymLQwknfzm-gBpQlhwtJ9s50o0RyFeOFRsTK9RHDez5PVv56ecvxwTrMjqc-7X5hlIN24ATlixm2ZPRzSGgLXEW4'
    }
  ];

  return (
    <div className="flex flex-col gap-6">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-slate-50/80 p-4 pb-2 backdrop-blur-sm">
        <h1 className="flex-1 text-2xl font-bold leading-tight tracking-tighter text-green-950">
          {t.title}
        </h1>
        <div className="flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-green-950 transition-colors hover:bg-green-100">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-green-950 transition-colors hover:bg-green-100">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-8 px-4">
        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-green-950">
            {t.bestPrices}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {crops.map((crop, index) => (
              <div key={index} className="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <img 
                    alt={`${crop.name} icon`} 
                    className="h-6 w-6 rounded-full" 
                    src={crop.icon}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxNjY1MzQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS13aGVhdCI+CiAgPHBhdGggZD0iTTIgM2gxMGEyIDIgMCAwIDEgMiAydjE0YTIgMiAwIDAgMS0yIDJINHMyLTEuNS0yLTIiLz4KICA8cGF0aCBkPSJNMTggMy4wNkEyIDIgMCAwIDEgMjIgOXYxM2EyIDIgMCAwIDEtNCAwVjVhMiAyIDAgMCAwLTItMloiLz4KICA8cGF0aCBkPSJtMTQgMTAtMyAzbDMtM20tMyAzbC0zLTMiLz4KPC9zdmc+';
                    }}
                  />
                  <p className="text-sm font-bold text-green-950">{crop.name}</p>
                </div>
                <p className="text-2xl font-bold text-green-950">₹{crop.price}/qtl</p>
                <p className={`text-sm font-medium ${crop.changePositive ? 'text-green-600' : 'text-red-600'}`}>
                  {crop.change}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xl font-bold leading-tight tracking-tight text-green-950">
            {t.orderRequests}
          </h2>
          <div className="flex flex-col gap-4">
            {orderRequests.map((order, index) => (
              <div key={index} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
                <div 
                  className="h-12 w-12 flex-shrink-0 rounded-full bg-cover bg-center bg-no-repeat" 
                  style={{ backgroundImage: `url(${order.icon})` }}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-green-950">{order.company}</p>
                    <span className="text-xs font-medium text-slate-500">
                      {t.timeAgo(order.time)}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-slate-600">
                    {t.requesting} {order.quantity} qtl {t.of} {order.crop}
                  </p>
                  <p className="text-lg font-bold text-green-800">
                    {t.offer}: ₹{order.price}/qtl
                  </p>
                  <div className="mt-2 flex gap-2">
                    <button className="flex-1 rounded-lg bg-[#45c91d] px-4 py-2 text-sm font-bold text-green-950 transition-colors hover:bg-opacity-90">
                      {t.accept}
                    </button>
                    <button className="flex-1 rounded-lg bg-green-100 px-4 py-2 text-sm font-bold text-green-950 transition-colors hover:bg-green-200">
                      {t.decline}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Marketplace;
