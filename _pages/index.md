---
layout: defaults/page
permalink: index.html
narrow: true
---

{% include components/intro.md %}

[更多...]({{ site.baseurl}}{% link _pages/about.md %})



### 时刻


<div class="card mb-3">
    <img src="{{site.baseurl}}/static/image/pics_cloud_z_f_1454180483.jpg" width="100%"  />
    <div class="card-body bg-light">
        <div class="card-text">第一场电影 2015/05/30 星期六 下午20:00</div>
    </div>
</div>

### 最近更新

{% for post in site.posts limit:3 %}
{% include components/post-card.html %}
{% endfor %}


