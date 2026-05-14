# 새 프로젝트 추가하는 법

---

## 1. 폴더 만들기

`src/content/projects/` 안에 새 폴더를 만든다.

```
src/content/projects/
├── 01-degreeshow/
├── 02-nueat/
├── 07-mynewproject/   ← 이렇게 추가
```

> **폴더 이름 규칙**: `숫자-프로젝트명` 형식으로 쓴다.  
> 숫자가 홈 화면에서의 **정렬 순서**가 된다. (01이 맨 위)

---

## 2. 폴더 안에 파일 넣기

```
07-mynewproject/
├── thumb.jpg        ← 홈 화면 썸네일 (필수)
├── meta.json        ← 프로젝트 정보 (필수)
└── photos/
    ├── 1.jpg        ← 상세 페이지 사진들
    ├── 2.jpg
    └── 3.jpg
```

- 썸네일 파일명은 반드시 `thumb.jpg` (또는 `.png`, `.webp`)
- 사진은 `photos/` 폴더 안에 넣고, 파일명은 자유롭게

---

## 3. meta.json 작성하기

아래가 전체 템플릿이다. **필수 항목**만 있으면 동작한다.

```json
{
  "projectName": "프로젝트 이름",
  "year": "2025",
  "type": "클라이언트 이름 또는 Self-Initiated",
  "tags": ["Brand Identity", "Graphic"],

  "overview": "프로젝트 설명글. **이렇게 하면 세미볼드**가 된다.\n두 번째 문단은 \\n으로 나눈다.",
  "scope": "Brand Identity, Graphic",
  "team": ["Brand Identity", "Space"],
  "collaborators": ["Direction: 홍길동\nSpace: 김철수\nPhoto: 이영희"],

  "wip": false,
  "award": false,

  "layout": [
    ["1.jpg"],
    ["2.jpg", "3.jpg"],
    ["4.jpg", "5.jpg", "6.jpg"]
  ]
}
```

---

## 4. 각 항목 설명

### 필수

| 항목 | 설명 | 예시 |
|------|------|------|
| `projectName` | 상세 페이지 제목 | `"2025 Degree Show"` |
| `year` | 연도 | `"2025"` |
| `type` | Client 란에 표시 | `"Hongik University"` |
| `tags` | 필터 태그 | `["Brand Identity", "Graphic"]` |

**사용 가능한 태그**: `Brand Identity` / `Graphic` / `Space` / `Interface` / `Content Creation`

---

### 선택 (상세 페이지용)

| 항목 | 설명 |
|------|------|
| `overview` | 왼쪽 패널 설명글 |
| `scope` | Scope of work 란 |
| `team` | Team 란 |
| `collaborators` | Collaborators 란 |
| `wip` | `true`면 홈에서 "WORK IN PROGRESS" 표시, 상세 페이지 진입 불가 |
| `award` | `true`면 홈에서 "Award" 뱃지 표시 |
| `layout` | 상세 페이지 사진 배열 방식 |

---

## 5. overview 텍스트 꾸미기

### 세미볼드
`**텍스트**` 로 감싸면 세미볼드(600)로 표시된다.

```json
"overview": "**About this project.**\n본문 내용이 이어집니다."
```

### 문단 나누기
`\n` 을 쓰면 문단이 나뉜다.

```json
"overview": "첫 번째 문단.\n두 번째 문단.\n세 번째 문단."
```

> ⚠️ **중요**: overview는 무조건 한 줄이어야 한다.  
> VSCode에서 Enter 키로 줄을 바꾸면 JSON이 깨진다.  
> 줄 나누기는 오직 `\n` 으로만 한다.

---

## 6. layout으로 사진 배열하기

`layout`은 상세 페이지에서 사진을 어떻게 배치할지 정한다.  
배열 안의 배열 하나가 **한 줄**이다.

```json
"layout": [
  ["1.jpg"],              ← 1장: 전체 너비
  ["2.jpg", "3.jpg"],     ← 2장: 나란히
  ["4.jpg", "5.jpg", "6.jpg"]  ← 3장: 나란히
]
```

- 한 줄에 사진이 2장 이상이면 **세로 높이가 자동으로 맞춰진다**
- 사진 비율은 그대로 유지되고, 크롭되지 않는다
- 파일명은 `photos/` 폴더 안의 실제 파일명과 일치해야 한다

---

## 7. collaborators 여러 줄로 쓰기

한 항목에 여러 줄을 넣으려면 `\n` 으로 구분한다.

```json
"collaborators": ["Direction: Chaeyeon Kang\nSpace: Gunhee Yun\nPhoto: Seyeon Na"]
```

표시 결과:
```
Direction: Chaeyeon Kang
Space: Gunhee Yun
Photo: Seyeon Na
```

---

## 8. 완성 예시

```json
{
  "projectName": "Nueat Brand Identity",
  "year": "2024",
  "type": "Nueat",
  "tags": ["Brand Identity", "Graphic"],
  "wip": false,
  "award": true,

  "overview": "**About Nueat.**\n뉴잇은 새로운 식문화를 제안하는 브랜드다.\n브랜드 아이덴티티 전반을 디자인했다.",
  "scope": "Brand Identity, Graphic",
  "team": ["Brand Identity"],
  "collaborators": ["Design: Eunje Heo\nPhoto: Seyeon Na"],

  "layout": [
    ["cover.jpg"],
    ["detail-1.jpg", "detail-2.jpg"],
    ["detail-3.jpg"],
    ["mockup-1.jpg", "mockup-2.jpg", "mockup-3.jpg"]
  ]
}
```

---

## 빠른 체크리스트

새 프로젝트 추가할 때 확인할 것:

- [ ] `src/content/projects/` 안에 폴더 만들었나? (숫자- 접두사 포함)
- [ ] `thumb.jpg` 넣었나?
- [ ] `photos/` 폴더에 사진 넣었나?
- [ ] `meta.json` 만들었나?
- [ ] `overview`에 실제 줄바꿈(Enter) 없이 `\n`만 썼나?
- [ ] `layout`의 파일명이 `photos/` 안의 실제 파일명과 일치하나?
- [ ] JSON에 빠진 쉼표나 따옴표 없나? (마지막 항목 뒤엔 쉼표 없어야 함)
