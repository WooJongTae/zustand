import React from "react";

const Footer = () => {
  const footerData = [
    "자주 묻는 질문",
    "고객 센터",
    "계정",
    "미디어 센터",
    "투자 정보(IR)",
    "입사 정보",
    "넷플릭스 지원 디바이스",
    "이용 약관",
    "개인정보 처리 방침",
    "쿠키 설정",
    "회사 정보",
    "문의 하기",
    "속도 테스트",
    "법적 고지",
    "오직 넷플릭스에서",
  ];

  const selectData = [{ language: "한국어" }, { language: "English" }];
  return (
    <div className="">
      <div className=" mx-96">
        <p>질문이 있으신가요? 문의 전화: xx-xxx-xxx-xxxx(수신자 부담)</p>
        <div className="flex flex-wrap ">
          {footerData.map((data) => (
            <div className="w-1/4 py-2 ">
              <p className=" border-b-2 inline-block ">{data}</p>
            </div>
          ))}
        </div>
        <form>
          <select>
            {selectData.map((data) => (
              <option value={data.language}>{data.language}</option>
            ))}
          </select>
        </form>
        <p>넷플릭스 대한민국</p>
        <div>
          <p>
            넷플릭스서비시스코리아 유한회사 통신판매업신고번호:
            제2018-서울종로-0426호 전화번호: 00-308-321-0161 (수신자 부담)
          </p>
          <p>대표: 레지널드 숀 톰프슨</p>
          <p>이메일 주소: korea@netflix.com</p>
          <p>
            주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층
            우편번호 03161
          </p>
          <p> 사업자등록번호: 165-87-00119</p>
          <p> 클라우드 호스팅: Amazon Web Services Inc.</p>
          <p>공정거래위원회 웹사이트</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
