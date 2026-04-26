# Content RAG Review - 2026-04-26

## Scope

Reviewed the public blog content with the local Korean tax-law RAG pipeline at:

`C:\Users\msp05\Documents\2. Work\4. Tax\5. reference\국세법령\rag_design`

The goal was to improve Google, AI answer-engine, and NAVER readability by strengthening source attribution, freshness signals, and lifecycle status.

## RAG Queries Used

- `세금계산서 지연 발급 미발급 가산세 공급가액 1% 2% 부가가치세법 제60조`
- `현금영수증 의무발행 업종 건당 10만원 미발급 가산세 20% 소득세법 조세범처벌법`
- `사업장 현황신고 면세사업자 2월 10일 가산세 의료업 수의업 약사업 소득세법`
- `업무용승용차 업무전용자동차보험 운행기록부 손금산입 한도 법인세법`
- `가지급금 인정이자 업무무관 가지급금 대표이사 상여 법인세법 시행령`
- `식대 비과세 월 20만원 자가운전보조금 출산보육수당 근로소득 비과세 소득세법 제12조`
- `주택 임대 부가가치세 면세 상가 임대 과세 부가가치세법 제26조`
- `간이과세자 부가가치세법 제61조 간이과세 적용 기준 제69조 납부의무 면제`
- `조세특례제한법 제104조의27 고배당기업 배당소득 분리과세 세율`
- `법인세법 제55조 2026 법인세율 10 20 22 25`

## Changes Made

- Added specific law article source links to high-risk posts about deadlines, penalties, tax rates, deductions, exemptions, and special regimes.
- Added internal lifecycle status to posts. These values are not rendered as public badges.
- Removed low-value English slug keywords from frontmatter keywords.
- Removed public status badges from blog cards and article pages.
- Extended `llms.txt` with status, last-checked date, and source URLs for AI crawlers.

## Open Editorial Risk

The RAG engine has strong recall for direct article references but weaker recall on broad natural-language questions. For any future post that includes exact rates, filing dates, or penalties, use both:

1. RAG query by topic.
2. Direct article-number verification against law.go.kr.
