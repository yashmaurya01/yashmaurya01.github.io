window.READING_DATA = {
  articles: [
    {
      id: 'frontier-training-methodologies',
      title: 'frontier model training methodologies',
      url: 'https://djdumpling.github.io/2026/01/31/frontier_training.html',
      published: '2026-01',
      venue: 'Alex Wa\'s Blog',
      tags: [
        'Frontier Training',
        'Systems Optimization',
        'Post-Training',
        'RLVR',
        'Long Context'
      ],
      topics: [
        'Data Mixture Scheduling',
        'RNoPE + Document Masking',
        'GQA vs MHA vs MQA vs MLA',
        'Stability Guardrails',
        'Scaling Laws vs Overtraining',
        'In-Flight Off-Policy Effects',
        'Reward Hacking in Hybrid Reasoning',
        'Training Ops Failure Modes'
      ],
      blurb: 'A systems-first synthesis of frontier model development where data schedule, stability controls, and training operations dominate isolated algorithmic gains.',
      writeup: 'This post argues that the hardest frontier-model gains come from disciplined systems engineering rather than isolated novelty. It highlights that data-mixture quality and stage-wise scheduling often matter more than one-off architecture swaps, while long-context success depends on infrastructural choices such as masking and positional strategy. In post-training, it surfaces subtle optimization pathologies like in-flight off-policy drift and reward hacking in hybrid reasoning modes. The most practical takeaway is operational: many critical failures originate in storage/dataloader behavior, so rigorous ablation design and pipeline observability are first-class research tools.'
    }
  ],

  quizzes: {
    'frontier-training-methodologies': {
      title: 'Advanced Recap MCQ: Frontier Model Training Methodologies',
      questions: [
        {
          prompt: 'Your team can improve only one axis under fixed compute. Which intervention is most aligned with the article\'s central thesis for largest expected gain?',
          options: [
            'Swap AdamW for Muon everywhere without changing data',
            'Introduce a late-stage high-quality data schedule with contamination controls',
            'Increase model width while keeping static data mixture',
            'Adopt a novel hybrid attention kernel before ablation'
          ],
          answer: 1,
          feedback: 'Correct. The article repeatedly argues mixture quality/scheduling and data hygiene dominate many isolated architecture tweaks.'
        },
        {
          prompt: 'Why does the article favor RNoPE + document masking for long-context scaling despite similar short-context ablation scores?',
          options: [
            'Because RNoPE reduces parameter count significantly',
            'Because document masking and positional strategy are foundational for stable context-length extension',
            'Because MQA requires it for convergence',
            'Because it guarantees better multilingual compression'
          ],
          answer: 1,
          feedback: 'Correct. The recommendation is about robustness during 4k→32k→64k→128k scaling, not short-context deltas alone.'
        },
        {
          prompt: 'In the RL section, what is the subtle systems-level implication of in-flight updates during GRPO-like pipelines?',
          options: [
            'They make all rollouts strictly on-policy',
            'They can render later rollout batches slightly off-policy within the same update cycle',
            'They remove KL-control requirements',
            'They eliminate stale-policy artifacts entirely'
          ],
          answer: 1,
          feedback: 'Correct. Throughput optimizations can shift training away from ideal on-policy assumptions.'
        },
        {
          prompt: 'Which choice best captures the article\'s warning about sequence packing in post-training?',
          options: [
            'Packing is always beneficial regardless of dataset size',
            'Packing improves efficiency, but larger effective batch can reduce update count and hurt small-data regimes',
            'Packing only affects memory footprint and not optimization dynamics',
            'Packing should be replaced by full padding for evaluation parity'
          ],
          answer: 1,
          feedback: 'Correct. The tokens/step increase can alter optimization dynamics and degrade some evals in smaller-data settings.'
        },
        {
          prompt: 'For hybrid reasoning models, why can naive RLVR with GRPO on /no_think modes become counterproductive?',
          options: [
            'It reduces token length too aggressively',
            'It can reward-hack by drifting into longer chain-of-thought behavior, inflating both reward and length',
            'It blocks verifier signals',
            'It only fails when using MoE'
          ],
          answer: 1,
          feedback: 'Correct. The article highlights overlong-completion penalties as mitigation for this exact pathology.'
        },
        {
          prompt: 'A run shows major throughput collapse after hours. According to the article\'s case study, the highest-value first debugging lens is:',
          options: [
            'Rewriting transformer kernels immediately',
            'Treating it as storage/data-pipeline behavior before blaming model math',
            'Reducing model depth by 20%',
            'Turning off checkpointing'
          ],
          answer: 1,
          feedback: 'Correct. The documented failure came from storage eviction and dataloader lookup-table behavior, not core model equations.'
        },
        {
          prompt: 'Which statement best reflects the article\'s position on scaling laws in practice?',
          options: [
            'Compute-optimal scaling should be followed rigidly',
            'Scaling laws are useful priors, but inference economics and sparsity/runtime tradeoffs alter final choices',
            'Scaling laws only apply to dense models',
            'Overtraining is always suboptimal'
          ],
          answer: 1,
          feedback: 'Correct. The article emphasizes pragmatic deviations driven by deployment and inference constraints.'
        },
        {
          prompt: 'Why does the article treat ablation methodology as a resilience mechanism, not just a model-quality tactic?',
          options: [
            'Ablations are mainly for publication storytelling',
            'Fast, discriminative ablations reduce uncertainty when diagnosing inevitable main-run failures',
            'Ablations can replace eval infrastructure',
            'Ablations remove the need for seed control'
          ],
          answer: 1,
          feedback: 'Correct. Reliable ablation design is framed as operational insurance during debugging crises.'
        }
      ]
    }
  },

  flashcards: {
    'frontier-training-methodologies': [
      {
        front: 'Core Thesis',
        back: 'Frontier training is primarily a systems problem: data curation/scheduling, architecture defaults, and stability operations dominate isolated algorithmic novelty.'
      },
      {
        front: 'Derisking Principle',
        back: 'Do not change multiple variables at once; ablate quickly and with high discriminative reliability to preserve causal interpretability.'
      },
      {
        front: 'Attention Tradeoff Ladder',
        back: 'MQA minimizes KV cost but can lose head specialization; GQA (small groups) balances quality and efficiency; MLA compresses KV further but raises implementation complexity.'
      },
      {
        front: 'Long-Context Default',
        back: 'Document masking plus positional strategy (RNoPE/YaRN-family scaling) is treated as robust infrastructure for context extension rather than a late patch.'
      },
      {
        front: 'QK-Norm Caution',
        back: 'QK-norm can stabilize logits but may hurt long-context retrieval by flattening magnitude signals needed to emphasize relevant tokens.'
      },
      {
        front: 'Batch Warmup Intuition',
        back: 'Critical batch size grows over training; early high-gradient regimes favor smaller effective batches, with larger batches becoming viable later.'
      },
      {
        front: 'Token Utility',
        back: 'Performance per token, not token count alone, drives efficiency; high-quality data should be leveraged strategically but not overfit into narrow generalization.'
      },
      {
        front: 'Multi-Stage Mixtures',
        back: 'Late-stage high-quality/reasoning data can disproportionately shape final behavior due to end-of-training distribution effects.'
      },
      {
        front: 'Mid-Training Trigger',
        back: 'Use early SFT diagnostics to decide domain-specific mid-training; if objective is shallow style alignment, post-training compute may be higher ROI.'
      },
      {
        front: 'RLVR Failure Mode',
        back: 'Hybrid reasoning policies can reward-hack via longer traces; apply length-aware penalties and mode-specific controls to prevent objective drift.'
      },
      {
        front: 'In-Flight Off-Policy Drift',
        back: 'Throughput-oriented rollout/update pipelines can make later batches partially off-policy even with ostensibly on-policy algorithms.'
      },
      {
        front: 'Ops Reality',
        back: 'Throughput collapse, noisy loss, and instability often originate in storage, dataloader access patterns, and orchestration—not model equations.'
      }
    ]
  }
};
