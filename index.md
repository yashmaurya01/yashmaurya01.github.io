# Yash Maurya

Website: https://yashmaurya.com/
Last content update: 2026-11-17

Research Engineer at [Scale AI](https://scale.com) · AI safety & evaluation

## About

I work on frontier AI safety and evaluation. I think about what can go wrong when autonomous agents get access to our lives (yes, you probably gave yours too much access), especially when they start interacting with other agents. My focus is on AI control, monitoring, and multi-agent safety.

I completed my master’s in Privacy Engineering at Carnegie Mellon University. Previously, I worked at BNY, Samsung, and Dynamo AI.

At Scale AI, I work on evaluation and red teaming for frontier language models, with a focus on alignment, safety, privacy, and dependable behavior in real-world deployments.

I care about making advanced models trustworthy in production, especially under adversarial and edge-case behavior. My work sits at the intersection of model capability, policy constraints, and operational risk.

I completed my master’s at Carnegie Mellon University in Privacy Engineering, where I worked on privacy, LLM safety, and evaluation research across academia and industry collaborations.

Previously, I worked on AI governance and evaluation at BNY, federated learning at Dynamo AI, and recommendation systems at Samsung.

## Contact and profiles

- [Email](mailto:maurya.yash152@gmail.com)
- [Scholar](https://scholar.google.com/citations?user=md0vz3wAAAAJ&hl=en)
- [GitHub](https://github.com/yashmaurya01)
- [LinkedIn](https://www.linkedin.com/in/yashmaurya/)
- [CV](https://yashmaurya.com/cv.pdf)
## News

- **2026**: [HarnessOpt-Bench](https://yashmaurya.com/#harnessopt-bench) accepted to **Findings of EACL 2027**.

- **2026**: [ROK-FORTRESS](https://yashmaurya.com/#rok-fortress) accepted to **NeurIPS 2026**. I’ll be presenting it in Sydney in December.

- **2026-07**: ["ROK-FORTRESS: Measuring the Effect of Geopolitical Transcreation for National Security and Public Safety"](https://arxiv.org/abs/2605.14152) received the **Best Paper Award** at the [TAIGR Workshop](https://www.taigr-workshop.com/) at ICML 2026.

- **2026**: ["LHAW: Controllable Underspecification for Long-Horizon Tasks"](https://arxiv.org/abs/2602.10525) accepted to the [Lifelong Agents: Learning, Aligning, Evolving Workshop](https://iclr.cc/virtual/2026/workshop/10000805) at ICLR 2026.

- **2026-02**: ["MoReBench: Evaluating Procedural and Pluralistic Moral Reasoning in Language Models, More than Outcomes"](https://arxiv.org/abs/2510.16380) accepted to ICLR 2026. [project page](https://morebench.github.io/)

- **2025-08**: Attended the [AI Risk Summit 2025](https://www.airisksummit.com/) at the Ritz-Carlton, Half Moon Bay and conducted a red-teaming workshop titled ["AI Red Teaming Room"](https://www.airisksummit.com/event-session/ai-red-teaming-room/).

- **2025-06**: My paper titled **"Making Privacy-Preserving AI Accessible: A Practitioner-Oriented Framework"** was accepted to the SUPA 2025 workshop at SOUPS.

- **2025-05**: Started working at [Scale AI](https://scale.com) as a Research Engineer.

- **2025-03**: My submission titled ["When Privacy Guarantees Meet Pre-trained LLMs: A Case Study in Synthetic Data"](https://www.usenix.org/conference/pepr25/presentation/maurya) got accepted to PEPR'25.

- **2025-02**: Started a new role as a Privacy Researcher at Carnegie Mellon University

- **2024-12**: Graduated from Carnegie Mellon University with a Master's in Privacy Engineering

- **2024-12**: Wrote an [article](https://amanpriyanshu.github.io/SynthLeak/) on auditing real-world differentially private synthetic data

- **2024-12**: My [position paper](https://yashmaurya.com/#llm-unlearning) on unlearning benchmarks in LLMs got accepted at SatML.

- **2024-09**: Started collaborating with Meta to study ["How Information and Control Shape Data Sharing and AI Engagement"](https://yashmaurya.com/#meta-capstone)

- **2024-06**: Joined the AI Hub at [BNY(Bank of New York Mellon)](https://www.bnymellon.com/) as an AI Governance Intern.

- **2024-06**: Presented my work ["Through the Lens of LLMs:Unveiling Differential Privacy Challenges"](https://yashmaurya.com/#topics-llm) at PEPR'24 in Santa Clara fully funded by CMU

- **2024-03**: Received Academic Achievement Award from the International Association of Privacy Professionals - Carnegie Mellon University's 2023-2024 IAPP Westin Scholar.

- **2024-03**: Received the Project Olympus Spark Grant by Swartz Center for Entrepreneurship for building a Language Learning agent to help non-native speakers improve their speaking skills

- **2024-03**: My work 'Guardrail Baselines for Unlearning in LLMs' got accepted at Secure and Trustworthy Large Language Models(SeT LLM) workshop at ICLR 2024

- **2024-01**: Completed the Certified Information Privacy Technologist (CIPT) credential from the IAPP - International Association of Privacy Professionals.

- **2023-09**: Won Space Theme in HackCMU'23 with our Space-JEDI Project

## Research

\* indicates equal contribution. Years follow the website’s existing grouping and can differ from the final publication year shown in the venue.

### 2026

#### SG-LegalClarify: A Large-Scale Benchmark for Legal Reasoning and Ambiguity Recognition in Singapore Law

Authors: Ziwei Gu, Michael S. Lee, Drew Rein, Yash Maurya, Vikneswaran Kumaran, Darshini Ramiah, Chenguang Wang, Udari Madhushani Sehwag

Venue: arXiv preprint arXiv:2611.19643 · 2026

Topics: Agents & reasoning

Tests legal reasoning and whether models recognize when to ask for missing facts. Across 1,100 lawyer-authored questions in 10 domains of Singapore law, evaluations of 19 LLMs reveal persistent gaps in reasoning and selective clarification, even with web search.

[Paper or presentation](https://arxiv.org/abs/2611.19643) · [Website entry](https://yashmaurya.com/#sg-legalclarify)
- [project](https://labs.scale.com/papers/sglegalclarify)
- [code](https://github.com/scaleapi/SG-LegalClarify)
- [dataset](https://huggingface.co/datasets/ScaleAI/SG-LegalClarify)

Preview: [SG-LegalClarify evaluation pipeline: assess whether facts are sufficient, answer or clarify, then grade with IRAC rubrics](https://yashmaurya.com/images/papers/sg-legalclarify-pipeline.webp)
Figure source: https://arxiv.org/pdf/2611.19643#page=5

#### HarnessOpt-Bench: Evaluating LLMs at Harness Optimization

Authors: Varun Ursekar, Apaar Shanker, Yash Maurya, Shehab Yasser, Vijay S. Kalmath, Veronica Chatrath, Yuan Xue

Venue: Findings of EACL 2027 · Accepted

Topics: Agents & reasoning

Benchmarks whether frontier LLMs can improve an agent's prompts, tools, memory, and orchestration under a fixed evaluation budget. Results show that optimizer models matter more than the coding harness they use, with gains varying widely by task and seed.

[Paper or presentation](https://arxiv.org/abs/2608.06301) · [Website entry](https://yashmaurya.com/#harnessopt-bench)

Preview: [Trusted execution architecture for held-out harness optimization](https://yashmaurya.com/images/papers/harnessopt-bench.webp)
Figure source: https://arxiv.org/html/2608.06301v1

#### Insights Generator: Systematic Corpus-Level Trace Diagnostics for LLM Agents

Authors: Akshay Manglik, Apaar Shanker, Kaustubh Deshpande, Jason Qin, Yash Maurya, Veronica Chatrath, Vijay S. Kalmath, Levi Lentz, Yuan Xue

Venue: arXiv preprint arXiv:2605.21347 · 2026

Topics: Agents & reasoning

A multi-agent system that turns large corpora of LLM-agent traces into evidence-backed diagnostic insights. Experts using its reports improved scaffold performance by 30.4 percentage points over the unmodified baseline.

[Paper or presentation](https://arxiv.org/abs/2605.21347) · [Website entry](https://yashmaurya.com/#insights-generator)

Preview: [Insights Generator architecture with input data, orchestrator, scout agents, investigator agents, and an insights report](https://yashmaurya.com/images/papers/insights-generator.webp)
Figure source: https://arxiv.org/html/2605.21347v1

#### MoReBench: Evaluating Procedural and Pluralistic Moral Reasoning in Language Models, More than Outcomes

Authors: Yu Ying Chiu\*, Michael S. Lee\*, Rachel Calcott, Brandon Handoko, Paul de Font-Reaulx, Raphaël Millière, Paula Rodriguez, Chen Bo Calvin Zhang, Ziwen Han, Udari Madhushani Sehwag, Yash Maurya, Christina Q. Knight, Harry R. Lloyd, Florence Bacus, Conor Downey, Mantas Mazeika, Bing Liu, Yejin Choi, Mitchell L. Gordon, Sydney Levine

Venue: International Conference on Learning Representations (ICLR 2026)

Topics: Agents & reasoning, Safety & governance

Evaluates model reasoning on morally ambiguous scenarios, where multiple conclusions can be defensible. Expert rubrics test whether models identify trade-offs, justify recommendations, and reason across normative ethics frameworks.

[Paper or presentation](https://arxiv.org/abs/2510.16380) · [Website entry](https://yashmaurya.com/#morebench)
- [project](https://morebench.github.io/)

Preview: [MoReBench moral dilemma, candidate reasoning, and contextualized rubric criteria](https://yashmaurya.com/images/papers/morebench.webp)
Figure source: https://arxiv.org/html/2510.16380v1

#### LHAW: Controllable Underspecification for Long-Horizon Tasks

Authors: George Pu, Michael S. Lee, Udari Madhushani Sehwag, David J. Lee, Bryan Zhu, Yash Maurya, Mohit Raghavendra, Yuan Xue, Samuel Marc Denton

Venue: Lifelong Agents: Learning, Aligning, Evolving Workshop at ICLR 2026

Topics: Agents & reasoning

Builds controllably underspecified versions of long-horizon agent tasks and validates their ambiguity through actual agent execution. The 285-task release measures whether agents seek clarification when missing information is genuinely outcome-critical.

[Paper or presentation](https://arxiv.org/abs/2602.10525) · [Website entry](https://yashmaurya.com/#lhaw)

Preview: [LHAW pipeline: segment extraction, candidate generation and filtering, and agent execution](https://yashmaurya.com/images/papers/lhaw.webp)
Figure source: https://arxiv.org/html/2602.10525v1

#### ROK-FORTRESS: Measuring the Effect of Geopolitical Transcreation for National Security and Public Safety

Authors: Yash Maurya\*, Michael S. Lee\*, Drew Rein, Bert Herring, Jonathan Nguyen, Kyungho Song, Udari Madhushani Sehwag, Jiyeon Cho, Kaustubh Deshpande, Yeongkyun Jang, Jiyeon Joo, Minn Seok Choi, Evi Fuelle, Christina Q. Knight, Joseph Brandifino, Max Fenkell

Venue: NeurIPS 2026 · Accepted · TAIGR Workshop at ICML 2026 · Best Paper Award

Topics: Safety & governance

A bilingual safety benchmark that separates language effects from geopolitical grounding through an English-Korean transcreation matrix. It exposes safety and over-refusal behaviors that translation-only evaluations miss.

[Paper or presentation](https://arxiv.org/abs/2605.14152) · [Website entry](https://yashmaurya.com/#rok-fortress)
- [dataset](https://huggingface.co/datasets/ScaleAI/ROK-FORTRESS_public)

Preview: [ROK-FORTRESS translation and transcreation pipeline for Korean-language safety evaluations](https://yashmaurya.com/images/papers/rok-fortress.webp)
Figure source: https://arxiv.org/html/2605.14152v1

### 2025

#### Making Privacy-Preserving AI Accessible: A Practitioner-Oriented Framework

Authors: Yash Maurya, Ibrahim Mohamed Anis Chhaya, Hana Habib

Venue: IEEE Symposium on Privacy Expectations (ISoPE) 2025 & SUPA 2025 Workshop on Societal & User-Centered Privacy in AI

Topics: ML privacy

Practitioner-oriented framework that organizes concrete ML privacy mitigations, tools, and design patterns across the ML lifecycle to help teams operationalize privacy-preserving AI in real-world deployments.

[Paper or presentation](https://github.com/Privacy-Engineering-CMU/Awesome-ML-Privacy-Mitigations) · [Website entry](https://yashmaurya.com/#accessible-privacy-framework)
- [program](https://ieee-isope.org/program/#:~:text=Making%20Privacy%2DPreserving%20AI%20Accessible%3A%20A%20Practitioner%2DOriented%20Framework)
- [paper](https://instituteofprivacydesign.org/wp-content/uploads/2026/04/IEEE-ISOPE-PPAI-Framework-ready.pdf)

Preview: [Illustrated overview of five ML pipeline phases connected to privacy threats, tools, and trade-offs](https://yashmaurya.com/images/papers/privacy-framework-overview.svg)
Figure source: https://instituteofprivacydesign.org/wp-content/uploads/2026/04/IEEE-ISOPE-PPAI-Framework-ready.pdf

Preview is an original conceptual illustration for this website, not a figure from the paper.

#### When Privacy Guarantees Meet Pre-trained LLMs: A Case Study in Synthetic Data

Authors: Yash Maurya\*, Aman Priyanshu\*

Venue: 2025 USENIX Conference on Privacy Engineering Practice and Respect (PEPR'25)

Topics: ML privacy

Shows how document formatting and contextual patterns can create privacy leakage in differentially private synthetic data pipelines built on opaque pre-trained LLMs, even at conservative privacy budgets.

[Paper or presentation](https://www.usenix.org/conference/pepr25/presentation/maurya) · [Website entry](https://yashmaurya.com/#synthetic-llm-pepr25)

Preview: [Privacy audit checklist from the talk covering PII identification, clustering, distribution analysis, auxiliary information, membership inference, and canary insertion](https://yashmaurya.com/images/papers/synthetic-llm-audit.webp)
Figure source: https://www.usenix.org/system/files/pepr25_slides-maurya.pdf#page=20

### 2024

#### Beyond the Accept Button: How Information and Control Shape Data Sharing and AI Engagement

Authors: Yash Maurya\*, Ibrahim Chhaya\*, Zuofei Hong\*, Limin Ge\*

Venue: Sponsored by Meta - MSIT-PE Capstone Report 2024 (Advisor: Professor Lorrie Cranor)

Topics: Usable privacy

Studied how consent flow design impacts AI engagement and data sharing, examining length and control options in social media data sharing.

[Paper or presentation](https://yashmaurya.com/pdfs/MetaFinalDraft.pdf) · [Website entry](https://yashmaurya.com/#meta-capstone)

Preview: [AI training consent interfaces comparing notice only, a general opt-in or opt-out, and granular data-sharing controls](https://yashmaurya.com/images/papers/meta-capstone.webp)
Figure source: https://yashmaurya.com/pdfs/MetaFinalDraft.pdf

#### Position: LLM Unlearning Benchmarks are Weak Measures of Progress

Authors: Pratiksha Thaker, Shengyuan Hu, Neil Kale, Yash Maurya, Zhiwei Steven Wu, Virginia Smith

Venue: IEEE Conference on Secure and Trustworthy Machine Learning (SaTML), 2025

Topics: ML privacy

Shows that modest, benign changes to common unlearning benchmarks can expose recoverable target information or substantially worse retention loss, making reported progress look more reliable than it is.

[Paper or presentation](https://arxiv.org/abs/2410.02879) · [Website entry](https://yashmaurya.com/#llm-unlearning)

Preview: [Anatomy of an LLM unlearning benchmark, showing model data, unlearning, forget and retain queries, and evaluation](https://yashmaurya.com/images/papers/llm-unlearning-overview.webp)
Figure source: https://arxiv.org/html/2410.02879v1#S2.F2

#### Designing a Benefit Assessment Protocol for AI Systems

Authors: Yash Maurya\*, Rachel Kim\*, Goutam Mukku\*

Venue: Course Project for Responsible AI Course(10-735) at CMU (Advisor: Professor Hoda Heidari)

Topics: Safety & governance

A structured protocol for systematically assessing AI benefits to enable more comprehensive AI evaluation.

[Paper or presentation](https://yashmaurya.com/pdfs/BenefitAssessmentProtocol.pdf) · [Website entry](https://yashmaurya.com/#benefit-assessment)

Preview: [Steps in the benefit assessment protocol](https://yashmaurya.com/images/papers/benefit-assessment.webp)
Figure source: https://yashmaurya.com/pdfs/BenefitAssessmentProtocol.pdf

#### Unified Locational Differential Privacy Framework

Authors: Yash Maurya\*, Aman Priyanshu\*, Suriya Ganesh\*, Vy Tran\*

Venue: arXiv preprint arXiv:2405.03903 (Advisor: Professor Hana Habib)

Topics: ML privacy

A privacy framework for aggregating sensitive location-based data while protecting individual privacy through differential privacy mechanisms.

[Paper or presentation](https://arxiv.org/abs/2405.03903) · [Website entry](https://yashmaurya.com/#location-dp)

Preview: [The paper’s simulator output showing differentially private aggregation of location categories around Carnegie Mellon University](https://yashmaurya.com/images/papers/location-dp-map.webp)
Figure source: https://arxiv.org/html/2405.03903v1#S4.F5

#### AI Governance and Accountability: An Analysis of Anthropic's Claude

Authors: Yash Maurya\*, Aman Priyanshu\*, Zuofei Hong\*

Venue: arXiv preprint arXiv:2407.01557 (Advisor: Professor Norman Sadeh)

Topics: Safety & governance

Case study on Anthropic's Claude using AI governance and accountability frameworks, examining compliance with NIST and EU AI Act standards.

[Paper or presentation](https://arxiv.org/abs/2407.01557) · [Website entry](https://yashmaurya.com/#claude-governance)

Preview: [Stanford Foundation Model Transparency Index comparison reproduced and discussed in the Claude governance paper](https://yashmaurya.com/images/papers/claude-governance-transparency.webp)
Figure source: https://arxiv.org/html/2407.01557v1#S5.F6

#### Guardrail baselines for unlearning in LLMs

Authors: Pratiksha Thaker, Yash Maurya, Shengyuan Hu, Zhiwei Steven Wu, Virginia Smith

Venue: ICLR 2024 Workshop on Secure and Trustworthy Large Language Models

Topics: ML privacy

Simple prompting and filtering baselines can match fine-tuning on common unlearning evaluations, motivating stronger metrics that distinguish inference-time safeguards from genuine parameter-level forgetting.

[Paper or presentation](https://arxiv.org/abs/2403.03329) · [Website entry](https://yashmaurya.com/#guardrail-llm)

Preview: [Comparison of unlearning and guardrail baseline evaluation results](https://yashmaurya.com/images/papers/guardrail-llm.svg)
Figure source: https://arxiv.org/html/2403.03329v1

#### Design and Evaluation of the UsersFirst Privacy Notice and Choice Threat Analysis Taxonomy

Authors: Xinran Alexandra Li\*, Yu-Ju Yang\*, Yash Maurya\*, Tian Wang\*, Hana Habib, Norman Sadeh, Lorrie Faith Cranor

Venue: Twentieth Symposium on Usable Privacy and Security (SOUPS 2024 Posters) & SOUPS 2024 Societal & User-Centered Privacy in AI Workshop (SUPA 2024)

Topics: Usable privacy

UsersFirst taxonomy outperforms LINDDUN PRO in detecting privacy notice and choice threats in user study.

[Paper or presentation](https://www.usenix.org/system/files/soups2024_poster22_abstract-li_final.pdf) · [Website entry](https://yashmaurya.com/#usersfirst-taxonomy)
- [poster](https://soups2024posters.usenix.hotcrp.com/doc/soups2024posters-final22.pdf?cap=hcav22CrKQnFRBHGTMMJKUsbbtfpPB)

Preview: [Baseline privacy threats identified using each taxonomy](https://yashmaurya.com/images/papers/usersfirst-taxonomy.webp)
Figure source: https://www.usenix.org/system/files/soups2024_poster22_abstract-li_final.pdf

#### UsersFirst: A User-Centric Privacy Threat Modeling Framework for Notice and Choice

Authors: Tian Wang\*, Xinran Alexandra Li\*, Miguel Rivera-Lanas\*, Yash Maurya\*, Hana Habib, Lorrie Faith Cranor, Norman Sadeh

Venue: Twentieth Symposium on Usable Privacy and Security (SOUPS 2024 Posters) & SOUPS 2024 Workshop on Privacy Threat Modeling (WPTM 2024)

Topics: Usable privacy

UsersFirst: A user-centric framework for identifying and mitigating privacy notice and choice threats, extending beyond LINDDUN

[Paper or presentation](https://www.usenix.org/system/files/soups2024_poster49_abstract-wang_final.pdf) · [Website entry](https://yashmaurya.com/#usersfirst-framework)
- [poster](https://soups2024posters.usenix.hotcrp.com/doc/soups2024posters-final49.pdf?cap=hcav49bMUTBoXBmTPeqNjgqsWcmHkB)

Preview: [The UsersFirst design and analysis methodology](https://yashmaurya.com/images/papers/usersfirst-framework.webp)
Figure source: https://soups2024posters.usenix.hotcrp.com/doc/soups2024posters-final49.pdf?cap=hcav49bMUTBoXBmTPeqNjgqsWcmHkB

#### Through the Lens of LLMs: Unveiling Differential Privacy Challenges

Authors: Yash Maurya\*, Aman Priyanshu\*, Vy Tran\*

Venue: 2024 USENIX Conference on Privacy Engineering Practice and Respect(PEPR'24)

Topics: ML privacy

LLMs demonstrate stronger privacy attacks on Google's Topics API, bypassing differential privacy safeguards.

[Paper or presentation](https://www.usenix.org/conference/pepr24/presentation/priyanshu) · [Website entry](https://yashmaurya.com/#topics-llm)

Preview: [Topics API membership inference threat model from the PEPR 2024 presentation](https://yashmaurya.com/images/papers/topics-llm.webp)
Figure source: https://www.usenix.org/system/files/pepr24_slides-priyanshu.pdf

#### Is it Worth Storing Historical Gradients?

Authors: Yash Maurya\*, Joong Ho Choi\*, Yingxin Liu\*

Venue: Course Project for Federated and Collaborative Learning Course(10-719) at CMU (Advisor: Professor Virginia Smith)

Topics: Federated learning

Studies label-poisoning detection in heterogeneous federated learning. In the tested settings, current model weights generally match or outperform historical-weight methods, avoiding the storage cost of retaining long update histories.

[Paper or presentation](https://yashmaurya.com/pdfs/GradientsFL.pdf) · [Website entry](https://yashmaurya.com/#gradients-fl)

Preview: [Complete trajectory diagram contrasting normal clients, a malicious client, and a client with heterogeneous data](https://yashmaurya.com/images/papers/gradients-fl-trajectories.webp)
Figure source: https://yashmaurya.com/pdfs/GradientsFL.pdf#page=2

### 2022

#### Federated Learning for Colorectal Cancer Prediction

Authors: Yash Maurya\*, Prahaladh Chandrahasan\*, G Poornalatha

Venue: 2022 IEEE 3rd Global Conference for Advancement in Technology (GCAT), 1-5

Topics: Federated learning

Federated learning enables privacy-preserving colorectal cancer prediction across hospitals with centralized-level accuracy

[Paper or presentation](https://ieeexplore.ieee.org/abstract/document/9972224) · [Website entry](https://yashmaurya.com/#federated-cancer)

Preview: [Federated healthcare workflow from the GCAT 2022 presentation: hospitals retain local data, send local model updates to a shared server, and receive an updated global model](https://yashmaurya.com/images/papers/federated-cancer-workflow.png)
Figure source: https://ieeexplore.ieee.org/abstract/document/9972224

### 2021

#### Improved variants of Score-CAM via Smoothing and Integrating

Authors: Rakshit Naidu, Haofan Wang, Soumya Snigdha Kundu, Ankita Ghosh, Yash Maurya, Shamanth R Nayak K, Joy Michael

Venue: Responsible Computer Vision (RCV) Workshop at CVPR 2021

Topics: Interpretability

Introduces smoothing and integration variants of Score-CAM to produce more localized attribution maps for CNN predictions. The poster compares SS-CAM and IS-CAM with existing methods using visual examples and quantitative explanation metrics.

[Paper or presentation](https://yashmaurya.com/pdfs/ImprovedScoreCAM_Poster.pdf) · [Website entry](https://yashmaurya.com/#scorecam-cvpr)
- [poster only](https://yashmaurya.com/pdfs/ImprovedScoreCAM_Poster.pdf)

Preview: [Poster comparison of an input dog photograph with Score-CAM, SS-CAM, and IS-CAM attribution heatmaps](https://yashmaurya.com/images/papers/scorecam-heatmaps.webp)
Figure source: https://yashmaurya.com/pdfs/ImprovedScoreCAM_Poster.pdf#page=1

### 2020

#### IS-CAM: Integrated Score-CAM for axiomatic-based explanations

Authors: Rakshit Naidu, Ankita Ghosh, Yash Maurya, Shamanth R Nayak K, Soumya Snigdha Kundu

Venue: arXiv preprint arXiv:2010.03023

Topics: Interpretability

Enhanced CNN interpretability through IS-CAM, integrating Score-CAM to produce sharper attribution maps

[Paper or presentation](https://arxiv.org/abs/2010.03023) · [Website entry](https://yashmaurya.com/#is-cam)

Preview: [Figure 2 attribution comparisons on Basenji, Capuchin, and Whippet images across CAM methods, including IS-CAM](https://yashmaurya.com/images/papers/is-cam-attributions.webp)
Figure source: https://arxiv.org/html/2010.03023v1#S4.F2

## Speaker bio

Yash Maurya is a Research Engineer at Scale AI, where he works on frontier AI safety. His research looks at how to keep increasingly capable AI agents in check, with a focus on AI control, monitoring, alignment auditing, and multi-agent safety. He came to safety through privacy, and his earlier work on LLM unlearning, red teaming, and differential privacy shaped his interest in how models behave under adversarial pressure. He earned his Master’s in Privacy Engineering from Carnegie Mellon University. Before Scale, he worked on AI governance and evaluation at BNY, federated learning at Dynamo AI, and recommendation systems at Samsung. His work has been published at leading machine learning and security conferences, including NeurIPS, ICLR, ICML, SaTML, and USENIX.

[Plain text speaker bio](https://yashmaurya.com/speaker-bio.txt)

## Other pages

- [Reading notes and recap questions](https://yashmaurya.com/reading.md). public reading list, writeups, topics, and quizzes.
- [Reading interface](https://yashmaurya.com/reading/). searchable reading list and browser-local personal notes.
- [Text diff](https://yashmaurya.com/diff.html). browser tool for comparing two texts.
- [QR code generator](https://yashmaurya.com/qrcode.html). browser tool for generating QR codes.
- [ML privacy mitigations repository](https://github.com/Privacy-Engineering-CMU/Awesome-ML-Privacy-Mitigations)
- [CV (PDF)](https://yashmaurya.com/cv.pdf)
