---
layout: page
title: Projects
permalink: /frameworks/
description: Personal and collaborative open-source frameworks, toolkits, and infrastructure projects.
nav: true
nav_order: 3
---

{% assign sections = "personal,group" | split: "," %}

<div class="frameworks-page">
  <div class="frameworks-hero">
    <p class="frameworks-lead">
      Work I build in the open.
    </p>
  </div>

  {% for section_key in sections %}
    {% assign section = site.data.frameworks[section_key] %}
    {% if section and section.items %}
      <section class="framework-section" aria-labelledby="framework-section-{{ section_key }}">
        <div class="framework-section-header">
          <p class="framework-section-kicker">
            {% if section_key == "personal" %}
              Independent
            {% else %}
              Collaborative
            {% endif %}
          </p>
          <h2 id="framework-section-{{ section_key }}">{{ section.title }}</h2>
          <p>{{ section.intro }}</p>
        </div>

        <div class="framework-grid">
          {% for item in section.items %}
            <article class="framework-card">
              <div class="framework-card-top">
                <div>
                  <h3>{{ item.name }}</h3>
                  {% if item.role %}
                    <p class="framework-role">{{ item.role }}</p>
                  {% endif %}
                </div>
                {% if item.status %}
                  <span class="framework-status">{{ item.status }}</span>
                {% endif %}
              </div>

              {% if item.summary %}
                <p class="framework-summary">{{ item.summary }}</p>
              {% endif %}

              {% if item.stack %}
                <ul class="framework-tags" aria-label="{{ item.name }} technology tags">
                  {% for tag in item.stack %}
                    <li>{{ tag }}</li>
                  {% endfor %}
                </ul>
              {% endif %}

              {% if item.highlights %}
                <ul class="framework-highlights">
                  {% for highlight in item.highlights %}
                    <li>{{ highlight }}</li>
                  {% endfor %}
                </ul>
              {% endif %}

              {% if item.links %}
                <div class="framework-links">
                  {% for link in item.links %}
                    <a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">{{ link.label }}</a>
                  {% endfor %}
                </div>
              {% endif %}
            </article>
          {% endfor %}
        </div>
      </section>
    {% endif %}
  {% endfor %}
</div>
