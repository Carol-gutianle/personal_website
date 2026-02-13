---
layout: post
title: "Building a Benchmark from Scratch"
date: 2026-02-11 12:00:00
description: "Practical lessons on designing, building, and analyzing a benchmark paper from end to end."
tags: [benchmark]
categories: [blog]
featured: true
---

This post records my experience of building a benchmark from scratch.

Original Chinese article:
- [Read on Zhihu](https://zhuanlan.zhihu.com/p/1899821299871769348)

## What Is a Benchmark?

A benchmark is a key part of AI progress. It usually defines a set of tasks and evaluates a range of models in a specific domain.

To build a strong benchmark paper, you typically need:
- Solid domain understanding.
- Sufficient compute resources (enough to finish evaluation in a reasonable time).
- A large team (benchmark datasets often require substantial data collection, review, and cleaning).

From a workflow perspective, a benchmark project usually goes through:
- Data preparation
- Data cleaning
- Data review (data side)
- Model inference
- Metric-based scoring

From a paper-structure perspective, benchmark papers often follow:
- Abstract
- Introduction
- Dataset body (including taxonomy/definitions if needed)
- Dataset construction process (data sources, statistics, and review protocols)
- Metrics
- Experiments (models + analysis of results)
- Research and Analysis
- Related Work
- Conclusion

These parts are the foundation. But if you stop there, the paper may feel low in contribution. So benchmark papers usually push deeper in one or both directions:
- Propose a method to mitigate the problem being benchmarked.
- Propose a new evaluation method (cheaper, faster, more accurate, broader, or more realistic than existing ones).

## How to Build and Manage Data

There are three common construction modes:
- Manual construction (the most resource-intensive).
- LLM-based self-instruct.
- Web crawling and recomposition of existing datasets.

For self-instruct data, many people find that API-synthesized data (e.g., from GPT-3.5/4) may lack diversity. You usually need to enrich generation with better templates, richer context, and stronger sampling settings (e.g., higher temperature).

For web crawling, watch out for:
- Copyright and licensing risks.
- Data desensitization/privacy issues.

After construction, multi-person quality review is usually required to catch quality and ethical issues.

A practical data-management principle is: **data + rules**.
- If data is built with crowdsourcing, preserve annotation rules for traceability.
- Keep a unified data format.
- For each dataset split, provide a `meta.txt` with size, purpose, and construction time.
- Keep a consistent annotation protocol across annotators.

Frequent protocol issues include:
- Naming mistakes: missing leading zeros (`30` vs `0030`).
- Format drift: changing `0030.jpg` into `0030.JPG`, `0030`, or `0030.jpg.jpg`.
- Encoding/font inconsistencies: visually similar but unclusterable text due to encoding/font differences.
- Redundant files: files like `.DS_Store` can break batch indexing.

These can be patched with special cases in cleaning scripts, but the best strategy is to control quality at the source.

## How to Score

Common scoring approaches:
- Rule-based (e.g., True/False, multiple-choice, substring matching).
- Metric-based (e.g., BLEU, PPL, or a composed new metric).
- Specific evaluator-based (e.g., using closed-source LLMs for zero-shot/ICL judging).

In practice, LLM-as-judge has several issues:
- Potential bias (models may favor outputs from related model families).
- Hard-to-constrain outputs (often requiring strict prompts like “please answer with a number only”).
- Limited reliability on hard cases.
- Instability over time (model behavior can change).
- Slow and expensive.

Specific evaluators also have tradeoffs:
- They require labeled data for training.
- Accuracy is still far from perfect; for 3+ classes, around 70-80% may already be considered good.

## How to Write Research and Analysis

Research and Analysis is where technical insight often appears. A common structure is 4-5 Question-and-Answer blocks.

This section can greatly increase paper value by discovering patterns and opening future research directions. But it is easy to fail in two ways:
- Too generic: reviewers may say it lacks novelty.
- Too bold without evidence: reviewers may say it overclaims.

Useful practical approaches:
- Clustering: group evaluated targets to identify shared traits and trend links.
- Ablations: test common dimensions such as model size, direction, or training data.
- Anomaly analysis: focus on outliers (best/worst cases) and explain why.

## How to Write Related Work

Related Work is usually 2-3 short paragraphs that position your paper and guide readers to nearby work.

A common mistake is choosing overly broad keywords. For example, if your topic is LLM hallucination benchmarking, using “Large Language Models” as the related-work axis is too broad. A better strategy is to go one level deeper (e.g., “Benchmarks for LLM Hallucination”).

After choosing a focused topic, trace the main research line and then cluster representative works by approach.

## Live Reading Stats (Best Effort)

<div id="zhihu-live-stats" style="padding:0.75rem 1rem;border:1px solid #ddd;border-radius:8px;display:inline-block;">
  Loading Zhihu stats...
</div>

<script>
(function () {
  const articleId = "1899821299871769348";
  const box = document.getElementById("zhihu-live-stats");
  if (!box) return;

  // Best effort only. Zhihu may block cross-origin browser requests.
  const endpoints = [
    `https://www.zhihu.com/api/v4/articles/${articleId}?include=comment_count,voteup_count,read_count`,
    `https://www.zhihu.com/api/v4/articles/${articleId}`
  ];

  const tryFetch = async (url) => {
    const res = await fetch(url, { credentials: "omit" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  };

  (async () => {
    try {
      let data = null;
      for (const url of endpoints) {
        try {
          data = await tryFetch(url);
          if (data) break;
        } catch (_) {}
      }

      if (!data) throw new Error("blocked");

      const readCount = data.read_count ?? data.readCount ?? "N/A";
      const voteCount = data.voteup_count ?? data.voteCount ?? "N/A";
      const commentCount = data.comment_count ?? data.commentCount ?? "N/A";

      box.innerHTML = `Reads: <strong>${readCount}</strong> | Likes: <strong>${voteCount}</strong> | Comments: <strong>${commentCount}</strong>`;
    } catch (e) {
      box.innerHTML = `Live stats are unavailable in browser (likely CORS/anti-crawl). Please check the latest reads on <a href=\"https://zhuanlan.zhihu.com/p/1899821299871769348\" target=\"_blank\">the original Zhihu page</a>.`;
    }
  })();
})();
</script>
