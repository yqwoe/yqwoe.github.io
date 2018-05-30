---
layout: defaults/page
permalink: index.html
narrow: true
---

{% include components/intro.md %}

[更多]({{ site.baseurl}}{% link _pages/about.md %})

### 这里什么都没有

Yq Woe 是一名新手自由职业者，这样说起来感觉很高大上，实际上就是没有固定工作，在家里待业。
这样做的优势在于可以兼顾家庭，陪伴老婆孩子一起长大。


<div class="card mb-3">
    <video src="{{ site.baseurl }}/static/vedio/1521082070.mp4" controls="controls" width="500" height="300"></video>
    <div class="card-body bg-light">
        <div class="card-text">吴冬冬在游泳</div>
    </div>
</div>



### 历史文章

{% for post in site.posts limit:3 %}
{% include components/post-card.html %}
{% endfor %}


