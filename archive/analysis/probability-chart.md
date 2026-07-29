╔═══════════════════════════════════════════════════════════════════════╗
║              IMPULSE KEYS - RESULT PROBABILITY DISTRIBUTION           ║
╚═══════════════════════════════════════════════════════════════════════╝

                             Target: 6.25%
                                 ↓
  ┌────────────────────────────────┬───────────────────────────────────┐
  │      OVER-REPRESENTED          │       UNDER-REPRESENTED           │
  │         (5 results)            │         (5 results)               │
  └────────────────────────────────┴───────────────────────────────────┘

  VOC      14.52% ████████████████████████████████████████ (4 left poles)
           ═══════════════════════════════════════════════════════════════
  FIORI     9.00% █████████████████████                    (3 left)
  PIXEL     9.00% █████████████████████                    (3 left)
  JOULE     9.00% █████████████████████                    (3 left)
  OData     9.00% █████████████████████                    (3 left)
           ───────────────────────────────────────────────────────────────
  TARGET    6.25% ██████████████                           ← IDEAL
           ───────────────────────────────────────────────────────────────
  A11Y      5.58% ████████████                             (2 left)
  CTRL      5.58% ████████████                             (2 left)
  AGENT     5.58% ████████████                             (2 left)
  BTP       5.58% ████████████                             (2 left)
  CORE      5.58% ████████████                             (2 left)
  QAQ       5.58% ████████████                             (2 left)
           ═══════════════════════════════════════════════════════════════
  SAFE      3.46% ███████                                  (1 left)
  API       3.46% ███████                                  (1 left)
  LOGS      3.46% ███████                                  (1 left)
  TRIO      3.46% ███████                                  (1 left)
           ───────────────────────────────────────────────────────────────
  FIRE      2.15% ████                                     (0 left poles)

╔═══════════════════════════════════════════════════════════════════════╗
║ KEY FINDING: VOC is 6.77x more likely than FIRE                      ║
║                                                                       ║
║ ROOT CAUSE: When dimension scores tie (23.46% of cases), the system  ║
║             always picks the "left pole" (Signal/Human/Explore/Spark)║
║                                                                       ║
║ DIMENSION BIAS:                                                       ║
║   • Signal vs Solution:   61.73% vs 38.27%                           ║
║   • Human vs Machine:     61.73% vs 38.27%                           ║
║   • Explore vs Align:     61.73% vs 38.27%                           ║
║   • Spark vs Stabilize:   61.73% vs 38.27%                           ║
║                                                                       ║
║ DISTRIBUTION PATTERN:                                                 ║
║   Follows binomial distribution based on # of left poles             ║
║   Formula: P = (50/81)^left × (31/81)^right                          ║
╚═══════════════════════════════════════════════════════════════════════╝

                           SOLUTIONS

  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃  1. RANDOM TIE-BREAKING (Recommended)                          ┃
  ┃     Change tie resolution from "always left" to "random 50/50" ┃
  ┃     → Makes all dimensions perfectly 50/50                     ┃
  ┃     → All results become ~6.25%                                ┃
  ┃     → No question changes needed                               ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃  2. USE 5 QUESTIONS PER DIMENSION                              ┃
  ┃     Odd total makes ties impossible                            ┃
  ┃     → Requires 4 new questions                                 ┃
  ┃     → Perfectly symmetric distribution                         ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

  ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
  ┃  3. VARY SCORING PATTERNS                                      ┃
  ┃     Mix different point distributions across questions         ┃
  ┃     → Complex to design                                        ┃
  ┃     → Can fine-tune distribution                               ┃
  ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
