import{_ as e,j as o,o as t,h as c,k as l,f as n,Q as p,s}from"./chunks/framework.d3daa342.js";const cs=JSON.parse('{"title":"第05讲：深度与广度优先搜索","description":"","frontmatter":{},"headers":[],"relativePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(33) 第05讲：深度与广度优先搜索.md","filePath":"posts/backEnd/037_300分钟搞定数据结构与算法/(33) 第05讲：深度与广度优先搜索.md","lastUpdated":1696682708000}'),i={name:"posts/backEnd/037_300分钟搞定数据结构与算法/(33) 第05讲：深度与广度优先搜索.md"},E=p('<h1 id="第05讲-深度与广度优先搜索" tabindex="-1">第05讲：深度与广度优先搜索 <a class="header-anchor" href="#第05讲-深度与广度优先搜索" aria-label="Permalink to &quot;第05讲：深度与广度优先搜索&quot;">​</a></h1><p>这节课重点学习深度优先搜索算法（简称为 DFS）和广度优先搜索算法（简称为 BFS）。</p><p>DFS 和 BFS 经常在算法面试题当中出现，在整个算法面试知识点中所占的比重非常大。应用最多的地方就是对图进行遍历，树也是图的一种。</p><h6 id="深度优先搜索-depth-first-search-dfs" tabindex="-1">深度优先搜索（Depth-First Search / DFS） <a class="header-anchor" href="#深度优先搜索-depth-first-search-dfs" aria-label="Permalink to &quot;深度优先搜索（Depth-First Search / DFS）&quot;">​</a></h6><p>深度优先搜索，从起点出发，从规定的方向中选择其中一个不断地向前走，直到无法继续为止，然后尝试另外一种方向，直到最后走到终点。就像走迷宫一样，尽量往深处走。</p><p>DFS 解决的是连通性的问题，即，给定两个点，一个是起始点，一个是终点，判断是不是有一条路径能从起点连接到终点。起点和终点，也可以指的是某种起始状态和最终的状态。问题的要求并不在乎路径是长还是短，只在乎有还是没有。有时候题目也会要求把找到的路径完整的打印出来。</p><h6 id="dfs-遍历" tabindex="-1">DFS 遍历 <a class="header-anchor" href="#dfs-遍历" aria-label="Permalink to &quot;DFS 遍历&quot;">​</a></h6><p>例题：假设我们有这么一个图，里面有A、B、C、D、E、F、G、H 8 个顶点，点和点之间的联系如下图所示，对这个图进行深度优先的遍历。</p>',8),r=s("h3",{id:"解题思路",tabindex:"-1"},[n("解题思路 "),s("a",{class:"header-anchor",href:"#解题思路","aria-label":'Permalink to "解题思路"'},"​")],-1),y=s("p",null,"必须依赖栈（Stack），特点是后进先出（LIFO）。",-1),d=s("br",null,null,-1),h=s("p",null,"第一步，选择一个起始顶点，例如从顶点 A 开始。把 A 压入栈，标记它为访问过（用红色标记），并输出到结果中。",-1),u=s("p",null,"第二步，寻找与 A 相连并且还没有被访问过的顶点，顶点 A 与 B、D、G 相连，而且它们都还没有被访问过，我们按照字母顺序处理，所以将 B 压入栈，标记它为访问过，并输出到结果中。",-1),g=s("p",null,"第三步，现在我们在顶点 B 上，重复上面的操作，由于 B 与 A、E、F 相连，如果按照字母顺序处理的话，A 应该是要被访问的，但是 A 已经被访问了，所以我们访问顶点 E，将 E 压入栈，标记它为访问过，并输出到结果中。",-1),m=s("p",null,"第四步，从 E 开始，E 与 B、G 相连，但是B刚刚被访问过了，所以下一个被访问的将是G，把G压入栈，标记它为访问过，并输出到结果中。",-1),f=s("p",null,"第五步，现在我们在顶点 G 的位置，由于与 G 相连的顶点都被访问过了，类似于我们走到了一个死胡同，必须尝试其他的路口了。所以我们这里要做的就是简单地将 G 从栈里弹出，表示我们从 G 这里已经无法继续走下去了，看看能不能从前一个路口找到出路。",-1),_=s("p",null,"可以看到，每次我们在考虑下一个要被访问的点是什么的时候，如果发现周围的顶点都被访问了，就把当前的顶点弹出。",-1),A=s("p",null,"第六步，现在栈的顶部记录的是顶点 E，我们来看看与 E 相连的顶点中有没有还没被访问到的，发现它们都被访问了，所以把 E 也弹出去。",-1),B=s("p",null,"第七步，当前栈的顶点是 B，看看它周围有没有还没被访问的顶点，有，是顶点 F，于是把 F 压入栈，标记它为访问过，并输出到结果中。",-1),b=s("p",null,"第八步，当前顶点是 F，与 F 相连并且还未被访问到的点是 C 和 D，按照字母顺序来，下一个被访问的点是 C，将 C 压入栈，标记为访问过，输出到结果中。",-1),k=s("p",null,"第九步，当前顶点为 C，与 C 相连并尚未被访问到的顶点是 H，将 H 压入栈，标记为访问过，输出到结果中。",-1),x=s("p",null,"第十步，当前顶点是 H，由于和它相连的点都被访问过了，将它弹出栈。",-1),C=s("p",null,"第十一步，当前顶点是 C，与 C 相连的点都被访问过了，将 C 弹出栈。",-1),z=s("p",null,"第十二步，当前顶点是 F，与 F 相连的并且尚未访问的点是 D，将 D 压入栈，输出到结果中，并标记为访问过。",-1),I=s("p",null,"第十三步，当前顶点是 D，与它相连的点都被访问过了，将它弹出栈。以此类推，顶点 F，B，A 的邻居都被访问过了，将它们依次弹出栈就好了。最后，当栈里已经没有顶点需要处理了，我们的整个遍历结束。",-1),S=s("h6",{id:"例题分析一",tabindex:"-1"},[n("例题分析一 "),s("a",{class:"header-anchor",href:"#例题分析一","aria-label":'Permalink to "例题分析一"'},"​")],-1),F=s("p",null,"给定一个二维矩阵代表一个迷宫，迷宫里面有通道，也有墙壁，通道由数字 0 表示，而墙壁由 -1 表示，有墙壁的地方不能通过，那么，能不能从 A 点走到 B 点。",-1),q=s("p",null,"从 A 开始走的话，有很多条路径通往 B，例如下面两种。",-1),D=p(`<h3 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><p>根据例题，来看实现代码，如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">boolean dfs(int maze[][], int x, int y) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 第一步：判断是否找到了B</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (x == B[0] &amp;&amp; y == B[1]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return true;</span></span>
<span class="line"><span style="color:#E1E4E8;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第二步：标记当前的点已经被访问过</span></span>
<span class="line"><span style="color:#E1E4E8;">    maze[x][y] = -1;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第三步：在四个方向上尝试</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int d = 0; d </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 4; d++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        int i = x + dx[d], j = y + dy[d];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 第四步：如果有一条路径被找到了，返回true</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (isSafe(maze, i, j) &amp;&amp; dfs(maze, i, j)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            return true;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 付出了所有的努力还是没能找到B，返回false</span></span>
<span class="line"><span style="color:#E1E4E8;">    return false;</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">boolean dfs(int maze[][], int x, int y) {</span></span>
<span class="line"><span style="color:#24292E;">    // 第一步：判断是否找到了B</span></span>
<span class="line"><span style="color:#24292E;">    if (x == B[0] &amp;&amp; y == B[1]) {</span></span>
<span class="line"><span style="color:#24292E;">        return true;</span></span>
<span class="line"><span style="color:#24292E;">    } </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第二步：标记当前的点已经被访问过</span></span>
<span class="line"><span style="color:#24292E;">    maze[x][y] = -1;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第三步：在四个方向上尝试</span></span>
<span class="line"><span style="color:#24292E;">    for (int d = 0; d </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 4; d++) {</span></span>
<span class="line"><span style="color:#24292E;">        int i = x + dx[d], j = y + dy[d];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 第四步：如果有一条路径被找到了，返回true</span></span>
<span class="line"><span style="color:#24292E;">        if (isSafe(maze, i, j) &amp;&amp; dfs(maze, i, j)) {</span></span>
<span class="line"><span style="color:#24292E;">            return true;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 付出了所有的努力还是没能找到B，返回false</span></span>
<span class="line"><span style="color:#24292E;">    return false;</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h6 id="非递归实现" tabindex="-1">非递归实现 <a class="header-anchor" href="#非递归实现" aria-label="Permalink to &quot;非递归实现&quot;">​</a></h6><p>递归实现：</p><ul><li><p>代码看上去很简洁；</p></li><li><p>实际应用中，递归需要压入和弹出栈，栈深的时候会造成运行效率低下。</p></li></ul><br><p>非递归实现：</p><ul><li><p>栈支持压入和弹出；</p></li><li><p>栈能提高效率。</p></li></ul><p><strong>代码实现</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">boolean dfs(int maze[][], int x, int y) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 创建一个Stack</span></span>
<span class="line"><span style="color:#E1E4E8;">    Stack&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer[]</span><span style="color:#E1E4E8;">&gt; stack = new Stack</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 将起始点压入栈，标记它访问过</span></span>
<span class="line"><span style="color:#E1E4E8;">    stack.push(new Integer[] {x, y});</span></span>
<span class="line"><span style="color:#E1E4E8;">    maze[x][y] = -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!stack.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 取出当前点</span></span>
<span class="line"><span style="color:#E1E4E8;">        Integer[] pos = stack.pop();</span></span>
<span class="line"><span style="color:#E1E4E8;">        x = pos[0]; y = pos[1];</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 判断是否找到了目的地</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (x == B[0] &amp;&amp; y == B[1]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">          return true;</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 在四个方向上尝试  </span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int d = 0; d </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 4; d++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            int i = x + dx[d], j = y + dy[d];</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (isSafe(maze, i, j)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            stack.push(new Integer[] {i, j});</span></span>
<span class="line"><span style="color:#E1E4E8;">            maze[i][j] = -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    return false;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">boolean dfs(int maze[][], int x, int y) {</span></span>
<span class="line"><span style="color:#24292E;">    // 创建一个Stack</span></span>
<span class="line"><span style="color:#24292E;">    Stack&lt;</span><span style="color:#B31D28;font-style:italic;">Integer[]</span><span style="color:#24292E;">&gt; stack = new Stack</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 将起始点压入栈，标记它访问过</span></span>
<span class="line"><span style="color:#24292E;">    stack.push(new Integer[] {x, y});</span></span>
<span class="line"><span style="color:#24292E;">    maze[x][y] = -1;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    while (!stack.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        // 取出当前点</span></span>
<span class="line"><span style="color:#24292E;">        Integer[] pos = stack.pop();</span></span>
<span class="line"><span style="color:#24292E;">        x = pos[0]; y = pos[1];</span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">        // 判断是否找到了目的地</span></span>
<span class="line"><span style="color:#24292E;">        if (x == B[0] &amp;&amp; y == B[1]) {</span></span>
<span class="line"><span style="color:#24292E;">          return true;</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">        // 在四个方向上尝试  </span></span>
<span class="line"><span style="color:#24292E;">        for (int d = 0; d </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 4; d++) {</span></span>
<span class="line"><span style="color:#24292E;">            int i = x + dx[d], j = y + dy[d];</span></span>
<span class="line"><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#24292E;">        if (isSafe(maze, i, j)) {</span></span>
<span class="line"><span style="color:#24292E;">            stack.push(new Integer[] {i, j});</span></span>
<span class="line"><span style="color:#24292E;">            maze[i][j] = -1;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    return false;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="算法分析" tabindex="-1">算法分析 <a class="header-anchor" href="#算法分析" aria-label="Permalink to &quot;算法分析&quot;">​</a></h3><p>DFS 是图论里的算法，分析利用 DFS 解题的复杂度时，应当借用图论的思想。图有两种表示方式：邻接表、邻接矩阵。假设图里有 V 个顶点，E 条边。</p><br><p>时间复杂度：</p><ul><li>邻接表</li></ul><p>访问所有顶点的时间为 O(V)，而查找所有顶点的邻居一共需要 O(E) 的时间，所以总的时间复杂度是 O(V + E)。</p><ul><li>邻接矩阵</li></ul><p>查找每个顶点的邻居需要 O(V) 的时间，所以查找整个矩阵的时候需要 O(V^2^) 的时间。</p><br><p>举例：利用 DFS 在迷宫里找一条路径的复杂度。迷宫是用矩阵表示。</p><p>解法：把迷宫看成是邻接矩阵。假设矩阵有 M 行 N 列，那么一共有 M × N 个顶点，因此时间复杂度就是 O(M × N)。</p><br><p>空间复杂度：</p><p>DFS 需要堆栈来辅助，在最坏情况下，得把所有顶点都压入堆栈里，所以它的空间复杂度是 O(V)，即 O(M × N)。</p><h6 id="例题分析二" tabindex="-1">例题分析二 <a class="header-anchor" href="#例题分析二" aria-label="Permalink to &quot;例题分析二&quot;">​</a></h6><p>例题：利用 DFS 去寻找最短的路径。</p><h3 id="解题思路-1" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-1" aria-label="Permalink to &quot;解题思路&quot;">​</a></h3><p>思路 1：暴力法。</p><p>寻找出所有的路径，然后比较它们的长短，找出最短的那个。此时必须尝试所有的可能。因为 DFS 解决的只是连通性问题，不是用来求解最短路径问题的。</p><p>思路 2：优化法。</p><p>一边寻找目的地，一边记录它和起始点的距离（也就是步数）。</p><p>从某方向到达该点所需要的步数更少，则更新。</p>`,33),v=s("p",null,"从各方向到达该点所需要的步数都更多，则不再尝试。",-1),j=p(`<h3 id="代码实现-1" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-1" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void solve(int maze[][]) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第一步. 除了A之外，将其他等于0的地方用MAX_VALUE替换</span></span>
<span class="line"><span style="color:#E1E4E8;">    for (int i = 0; i </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> maze.length; i++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int j = 0; j </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> maze[0].length; j++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">  	    if (maze[i][j] == 0 &amp;&amp; !(i == A[0] &amp;&amp; j == A[1])) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                maze[i][j] = Integer.MAX_VALUE;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第二步. 进行优化的DFS操作</span></span>
<span class="line"><span style="color:#E1E4E8;">    dfs(maze, A[0], A[1]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 第三步. 看看是否找到了目的地</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (maze[B[0]][B[1]] </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> Integer.MAX_VALUE) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        print(&quot;Shortest path count is: &quot; + maze[B[0]][B[1]]);</span></span>
<span class="line"><span style="color:#E1E4E8;">    } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">      print(&quot;Cannot find B!&quot;);</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"><span style="color:#E1E4E8;">     </span></span>
<span class="line"><span style="color:#E1E4E8;">    void dfs(int maze[][], int x, int y) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 第一步. 判断是否找到了B</span></span>
<span class="line"><span style="color:#E1E4E8;">        if (x == B[0] &amp;&amp; y == B[1]) return;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">        // 第二步. 在四个方向上尝试</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int d = 0; d </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 4; d++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            int i = x + dx[d], j = y + dy[d];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">            // 判断下一个点的步数是否比目前的步数+1还要大</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (isSafe(maze, i, j) &amp;&amp; maze[i][j] &gt; maze[x][y] + 1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            // 如果是，就更新下一个点的步数，并继续DFS下去</span></span>
<span class="line"><span style="color:#E1E4E8;">                maze[i][j] = maze[x][y] + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">                dfs(maze, i, j);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void solve(int maze[][]) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第一步. 除了A之外，将其他等于0的地方用MAX_VALUE替换</span></span>
<span class="line"><span style="color:#24292E;">    for (int i = 0; i </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> maze.length; i++) {</span></span>
<span class="line"><span style="color:#24292E;">        for (int j = 0; j </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> maze[0].length; j++) {</span></span>
<span class="line"><span style="color:#24292E;">  	    if (maze[i][j] == 0 &amp;&amp; !(i == A[0] &amp;&amp; j == A[1])) {</span></span>
<span class="line"><span style="color:#24292E;">                maze[i][j] = Integer.MAX_VALUE;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第二步. 进行优化的DFS操作</span></span>
<span class="line"><span style="color:#24292E;">    dfs(maze, A[0], A[1]);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 第三步. 看看是否找到了目的地</span></span>
<span class="line"><span style="color:#24292E;">    if (maze[B[0]][B[1]] </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> Integer.MAX_VALUE) {</span></span>
<span class="line"><span style="color:#24292E;">        print(&quot;Shortest path count is: &quot; + maze[B[0]][B[1]]);</span></span>
<span class="line"><span style="color:#24292E;">    } else {</span></span>
<span class="line"><span style="color:#24292E;">      print(&quot;Cannot find B!&quot;);</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"><span style="color:#24292E;">     </span></span>
<span class="line"><span style="color:#24292E;">    void dfs(int maze[][], int x, int y) {</span></span>
<span class="line"><span style="color:#24292E;">        // 第一步. 判断是否找到了B</span></span>
<span class="line"><span style="color:#24292E;">        if (x == B[0] &amp;&amp; y == B[1]) return;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">        // 第二步. 在四个方向上尝试</span></span>
<span class="line"><span style="color:#24292E;">        for (int d = 0; d </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 4; d++) {</span></span>
<span class="line"><span style="color:#24292E;">            int i = x + dx[d], j = y + dy[d];</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">            // 判断下一个点的步数是否比目前的步数+1还要大</span></span>
<span class="line"><span style="color:#24292E;">            if (isSafe(maze, i, j) &amp;&amp; maze[i][j] &gt; maze[x][y] + 1) {</span></span>
<span class="line"><span style="color:#24292E;">            // 如果是，就更新下一个点的步数，并继续DFS下去</span></span>
<span class="line"><span style="color:#24292E;">                maze[i][j] = maze[x][y] + 1;</span></span>
<span class="line"><span style="color:#24292E;">                dfs(maze, i, j);</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span></code></pre></div><p>注意：之前的题目只要找到了一个路径就返回，这里我们必须尽可能多的去尝试，直到找到最短路径。</p><h3 id="运行结果" tabindex="-1">运行结果 <a class="header-anchor" href="#运行结果" aria-label="Permalink to &quot;运行结果&quot;">​</a></h3><p>当程序运行完毕之后，矩阵的最终结果如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">2,  1,  A,  1,  2,  3</span></span>
<span class="line"><span style="color:#E1E4E8;">3,  2, -1,  2,  3,  4 </span></span>
<span class="line"><span style="color:#E1E4E8;">4,  3, -1,  3,  4,  5 </span></span>
<span class="line"><span style="color:#E1E4E8;">5,  4, -1, -1,  5,  6 </span></span>
<span class="line"><span style="color:#E1E4E8;">6, -1,  8,  7,  6,  7 </span></span>
<span class="line"><span style="color:#E1E4E8;">7,  8,  9,  8,  7, -1</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">2,  1,  A,  1,  2,  3</span></span>
<span class="line"><span style="color:#24292E;">3,  2, -1,  2,  3,  4 </span></span>
<span class="line"><span style="color:#24292E;">4,  3, -1,  3,  4,  5 </span></span>
<span class="line"><span style="color:#24292E;">5,  4, -1, -1,  5,  6 </span></span>
<span class="line"><span style="color:#24292E;">6, -1,  8,  7,  6,  7 </span></span>
<span class="line"><span style="color:#24292E;">7,  8,  9,  8,  7, -1</span></span></code></pre></div><br><p>可以看到，矩阵中每个点的数值代表着它离 A 点最近的步数。</p><h6 id="广度优先搜索-breadth-first-search-bfs" tabindex="-1">广度优先搜索（Breadth-First Search / BFS） <a class="header-anchor" href="#广度优先搜索-breadth-first-search-bfs" aria-label="Permalink to &quot;广度优先搜索（Breadth-First Search / BFS）&quot;">​</a></h6><p>广度优先搜索，一般用来解决最短路径的问题。和深度优先搜索不同，广度优先的搜索是从起始点出发，一层一层地进行，每层当中的点距离起始点的步数都是相同的，当找到了目的地之后就可以立即结束。</p><p>广度优先的搜索可以同时从起始点和终点开始进行，称之为双端 BFS。这种算法往往可以大大地提高搜索的效率。</p><p>举例：在社交应用程序中，两个人之间需要经过多少个朋友的介绍才能互相认识对方。</p><br><p>解法：</p><ul><li><p>只从一个方向进行 BFS，有时候这个人认识的朋友特别多，那么会导致搜索起来非常慢；</p></li><li><p>如果另外一方认识的人比较少，从这一方进行搜索，就能极大地减少搜索的次数；</p></li><li><p>每次在决定从哪一边进行搜索的时候，要判断一下哪边认识的人比较少，然后从那边进行搜索。</p></li></ul><h6 id="bfs-遍历" tabindex="-1">BFS 遍历 <a class="header-anchor" href="#bfs-遍历" aria-label="Permalink to &quot;BFS 遍历&quot;">​</a></h6><p>例题：假设我们有这么一个图，里面有A、B、C、D、E、F、G、H 8 个顶点，点和点之间的联系如下图所示，对这个图进行深度优先的遍历。</p>`,17),V=s("h3",{id:"解题思路-2",tabindex:"-1"},[n("解题思路 "),s("a",{class:"header-anchor",href:"#解题思路-2","aria-label":'Permalink to "解题思路"'},"​")],-1),M=s("p",null,"依赖队列（Queue），先进先出（FIFO）。",-1),O=s("br",null,null,-1),w=s("p",null,"一层一层地把与某个点相连的点放入队列中，处理节点的时候正好按照它们进入队列的顺序进行。",-1),T=s("p",null,"第一步，选择一个起始顶点，让我们从顶点 A 开始。把 A 压入队列，标记它为访问过（用红色标记）。",-1),P=s("p",null,"第二步，从队列的头取出顶点 A，打印输出到结果中，同时将与它相连的尚未被访问过的点按照字母大小顺序压入队列，同时把它们都标记为访问过，防止它们被重复地添加到队列中。",-1),N=s("p",null,"第三步，从队列的头取出顶点 B，打印输出它，同时将与它相连的尚未被访问过的点（也就是 E 和 F）压入队列，同时把它们都标记为访问过。",-1),L=s("p",null,"第四步，继续从队列的头取出顶点 D，打印输出它，此时我们发现，与 D 相连的顶点 A 和 F 都被标记访问过了，所以就不要把它们压入队列里。",-1),K=s("p",null,"第五步，接下来，队列的头是顶点 G，打印输出它，同样的，G 周围的点都被标记访问过了。我们不做任何处理。",-1),G=s("p",null,"第六步，队列的头是 E，打印输出它，它周围的点也都被标记为访问过了，我们不做任何处理。",-1),H=s("p",null,"第七步，接下来轮到顶点 F，打印输出它，将 C 压入队列，并标记 C 为访问过。",-1),Y=s("p",null,"第八步，将 C 从队列中移出，打印输出它，与它相连的 H 还没被访问到，将 H 压入队列，将它标记为访问过。",-1),Z=s("p",null,"第九步，队列里只剩下 H 了，将它移出，打印输出它，发现它的邻居都被访问过了，不做任何事情。",-1),U=s("p",null,"第十步，队列为空，表示所有的点都被处理完毕了，程序结束。",-1),Q=s("h6",{id:"例题分析一-1",tabindex:"-1"},[n("例题分析一 "),s("a",{class:"header-anchor",href:"#例题分析一-1","aria-label":'Permalink to "例题分析一"'},"​")],-1),X=s("p",null,"运用广度优先搜索的算法在迷宫中寻找最短的路径。",-1),R=s("h3",{id:"解题思路-3",tabindex:"-1"},[n("解题思路 "),s("a",{class:"header-anchor",href:"#解题思路-3","aria-label":'Permalink to "解题思路"'},"​")],-1),J=s("p",null,"搜索的过程如下。",-1),W=p(`<p>从起始点 A 出发，类似于涟漪，一层一层地扫描，避开墙壁，同时把每个点与 A 的距离或者步数标记上。当找到目的地的时候返回步数，这个步数保证是最短的。</p><h3 id="代码实现-2" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-2" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">void bfs(int[][] maze, int x, int y) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 创建一个队列queue，将起始点A加入队列中</span></span>
<span class="line"><span style="color:#E1E4E8;">    Queue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer[]</span><span style="color:#E1E4E8;">&gt; queue = new LinkedList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.add(new Integer[] {x, y});</span></span>
<span class="line"><span style="color:#E1E4E8;">  </span></span>
<span class="line"><span style="color:#E1E4E8;">    // 只要队列不为空就一直循环下去  </span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        // 从队列的头取出当前点</span></span>
<span class="line"><span style="color:#E1E4E8;">        Integer[] pos = queue.poll();</span></span>
<span class="line"><span style="color:#E1E4E8;">        x = pos[0]; y = pos[1];</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 从四个方向进行BFS</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int d = 0; d </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 4; d++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            int i = x + dx[d], j = y + dy[d];</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">            if (isSafe(maze, i, j)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                // 记录步数（标记访问过）</span></span>
<span class="line"><span style="color:#E1E4E8;">                maze[i][j] = maze[x][y] + 1;</span></span>
<span class="line"><span style="color:#E1E4E8;">                // 然后添加到队列中  </span></span>
<span class="line"><span style="color:#E1E4E8;">                queue.add(new Integer[] {i, j});</span></span>
<span class="line"><span style="color:#E1E4E8;">                // 如果发现了目的地就返回  </span></span>
<span class="line"><span style="color:#E1E4E8;">                if (i == B[0] &amp;&amp; j == B[1]) return;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">void bfs(int[][] maze, int x, int y) {</span></span>
<span class="line"><span style="color:#24292E;">    // 创建一个队列queue，将起始点A加入队列中</span></span>
<span class="line"><span style="color:#24292E;">    Queue&lt;</span><span style="color:#B31D28;font-style:italic;">Integer[]</span><span style="color:#24292E;">&gt; queue = new LinkedList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    queue.add(new Integer[] {x, y});</span></span>
<span class="line"><span style="color:#24292E;">  </span></span>
<span class="line"><span style="color:#24292E;">    // 只要队列不为空就一直循环下去  </span></span>
<span class="line"><span style="color:#24292E;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        // 从队列的头取出当前点</span></span>
<span class="line"><span style="color:#24292E;">        Integer[] pos = queue.poll();</span></span>
<span class="line"><span style="color:#24292E;">        x = pos[0]; y = pos[1];</span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">        // 从四个方向进行BFS</span></span>
<span class="line"><span style="color:#24292E;">        for (int d = 0; d </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 4; d++) {</span></span>
<span class="line"><span style="color:#24292E;">            int i = x + dx[d], j = y + dy[d];</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">            if (isSafe(maze, i, j)) {</span></span>
<span class="line"><span style="color:#24292E;">                // 记录步数（标记访问过）</span></span>
<span class="line"><span style="color:#24292E;">                maze[i][j] = maze[x][y] + 1;</span></span>
<span class="line"><span style="color:#24292E;">                // 然后添加到队列中  </span></span>
<span class="line"><span style="color:#24292E;">                queue.add(new Integer[] {i, j});</span></span>
<span class="line"><span style="color:#24292E;">                // 如果发现了目的地就返回  </span></span>
<span class="line"><span style="color:#24292E;">                if (i == B[0] &amp;&amp; j == B[1]) return;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h2 id="算法分析-1" tabindex="-1">算法分析 <a class="header-anchor" href="#算法分析-1" aria-label="Permalink to &quot;算法分析&quot;">​</a></h2><p>同样借助图论的分析方法，假设有 V 个顶点，E 条边。</p><br><p>时间复杂度：</p><ul><li>邻接表</li></ul><p>每个顶点都需要被访问一次，时间复杂度是 O(V)；相连的顶点（也就是每条边）也都要被访问一次，加起来就是 O(E)。因此整体时间复杂度就是 O(V+E)。</p><ul><li>邻接矩阵</li></ul><p>V 个顶点，每次都要检查每个顶点与其他顶点是否有联系，因此时间复杂度是 O(V^2^)。</p><p>举例：在迷宫里进行 BFS 搜索。</p><p>解法：用邻接矩阵。假设矩阵有 M 行 N 列，那么一共有 M×N 个顶点，时间复杂度就是 O(M×N)。</p><p>空间复杂度：</p><p>需要借助一个队列，所有顶点都要进入队列一次，从队列弹出一次。在最坏的情况下，空间复杂度是 O(V)，即 O(M×N)。</p><h6 id="例题分析二-1" tabindex="-1">例题分析二 <a class="header-anchor" href="#例题分析二-1" aria-label="Permalink to &quot;例题分析二&quot;">​</a></h6><p>例题：假设从起始点 A 走到目的地 B 的过程中，最多允许打通 3 堵墙，求最短的路径的步数。（这个题目可以扩展到允许打通任意数目的墙。）</p><h3 id="解题思路-4" tabindex="-1">解题思路 <a class="header-anchor" href="#解题思路-4" aria-label="Permalink to &quot;解题思路&quot;">​</a></h3><p>思路 1：暴力法。</p><br><ol><li>首先枚举出所有拆墙的方法.</li></ol><p>假设一共有 K 堵墙在当前的迷宫里，最多允许拆 3 堵墙，有四种情况：不拆，只拆一堵墙、两堵墙、三堵墙。组合方式如下。</p><p>C(K, 0) + C(K, 1) + C(K, 2) + C(K, 3) = 1 + K + K ×(K - 1) / 2 + K× (K - 1) ×(K - 2) / 6</p><p>上式复杂度为 K 的 3 次方，如果允许打通墙的数量是 w，那么就是 K 的 w 次方。</p><ol start="2"><li>分别进行 BFS，整体的时间复杂度就是 O(n^2^×K^w^)，从中找到最短的那条路径。</li></ol><p>很显然，该方法非常没有效率。</p><p>思路 2：</p><br><ol><li>将 BFS 的数量减少。</li></ol><ul><li><p>在不允许打通墙的情况下，只有一个人进行 BFS 搜索，时间复杂度是 n^2^；</p></li><li><p>允许打通一堵墙的情况下，分身为两个人进行 BFS 搜索，时间复杂度是 2×n^2^；</p></li><li><p>允许打通两堵墙的情况下，分身为三个人进行 BFS 搜索，时间复杂度是 3×n^2^；</p></li><li><p>允许打通三堵墙的情况下，分身为四个人进行 BFS 搜索，时间复杂度是 4×n^2^。</p></li></ul><ol start="2"><li>解决关键问题。</li></ol><ul><li><p>如果第一个人又遇到了一堵墙，那么他是否需要再次分身呢？不能。</p></li><li><p>第一个人怎么告诉第二个人可以去访问这个点？把这个点放入到队列中。</p></li><li><p>如何让 4 个人在独立的平面里搜索？利用一个三维矩阵记录每个层面里的点。</p></li></ul>`,32),$=p(`<p>只需要 4 个人去做 BFS，整体的时间复杂度就是 4 倍的 BFS。</p><h3 id="代码实现-3" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现-3" aria-label="Permalink to &quot;代码实现&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int bfs(int[][] maze, int x, int y, int w) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    // 初始化</span></span>
<span class="line"><span style="color:#E1E4E8;">    int steps = 0, z = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 利用队列来辅助BFS</span></span>
<span class="line"><span style="color:#E1E4E8;">    Queue&lt;</span><span style="color:#FDAEB7;font-style:italic;">Integer[]</span><span style="color:#E1E4E8;">&gt; queue = new LinkedList</span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;">&gt;();</span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.add(new Integer[] {x, y, z});</span></span>
<span class="line"><span style="color:#E1E4E8;">    queue.add(null);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 三维的visited记录各层平面中每个点是否被访问过</span></span>
<span class="line"><span style="color:#E1E4E8;">    boolean[][][] visited = new boolean[N][N][w + 1];</span></span>
<span class="line"><span style="color:#E1E4E8;">    visited[x][y][z] = true;  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">    // 只要队列不为空就一直循环</span></span>
<span class="line"><span style="color:#E1E4E8;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        Integer[] pos = queue.poll();</span></span>
<span class="line"><span style="color:#E1E4E8;">      </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (pos != null) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            // 取出当前点</span></span>
<span class="line"><span style="color:#E1E4E8;">            x = pos[0]; y = pos[1]; z = pos[2];</span></span>
<span class="line"><span style="color:#E1E4E8;">            // 如果遇到了目的地就立即返回步数</span></span>
<span class="line"><span style="color:#E1E4E8;">            if (x == B[0] &amp;&amp; y == B[1]) {</span></span>
<span class="line"><span style="color:#E1E4E8;">              return steps;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        // 朝四个方向尝试</span></span>
<span class="line"><span style="color:#E1E4E8;">        for (int d = 0; d </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> 4; d++) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            int i = x + dx[d], j = y + dy[d];</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span></span>
<span class="line"><span style="color:#E1E4E8;">            if (!isSafe(maze, i, j, z, visited)) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                continue;</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span></span>
<span class="line"><span style="color:#E1E4E8;">            // 如果在当前层遇到了墙，尝试打通它</span></span>
<span class="line"><span style="color:#E1E4E8;">            int k = getLayer(maze, w, i, j, z);</span></span>
<span class="line"><span style="color:#E1E4E8;">          </span></span>
<span class="line"><span style="color:#E1E4E8;">            if (k &gt;= 0) {</span></span>
<span class="line"><span style="color:#E1E4E8;">                // 如果能打通墙，就在下一层尝试</span></span>
<span class="line"><span style="color:#E1E4E8;">                visited[i][j][k] = true;</span></span>
<span class="line"><span style="color:#E1E4E8;">                queue.add(new Integer[] {i, j, k});</span></span>
<span class="line"><span style="color:#E1E4E8;">            }</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      } else {</span></span>
<span class="line"><span style="color:#E1E4E8;">        steps++;</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span></span>
<span class="line"><span style="color:#E1E4E8;">        if (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#E1E4E8;">            queue.add(null);</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">      }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    return -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int bfs(int[][] maze, int x, int y, int w) {</span></span>
<span class="line"><span style="color:#24292E;">    // 初始化</span></span>
<span class="line"><span style="color:#24292E;">    int steps = 0, z = 0;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 利用队列来辅助BFS</span></span>
<span class="line"><span style="color:#24292E;">    Queue&lt;</span><span style="color:#B31D28;font-style:italic;">Integer[]</span><span style="color:#24292E;">&gt; queue = new LinkedList</span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;">&gt;();</span></span>
<span class="line"><span style="color:#24292E;">    queue.add(new Integer[] {x, y, z});</span></span>
<span class="line"><span style="color:#24292E;">    queue.add(null);</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 三维的visited记录各层平面中每个点是否被访问过</span></span>
<span class="line"><span style="color:#24292E;">    boolean[][][] visited = new boolean[N][N][w + 1];</span></span>
<span class="line"><span style="color:#24292E;">    visited[x][y][z] = true;  </span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">    // 只要队列不为空就一直循环</span></span>
<span class="line"><span style="color:#24292E;">    while (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">        Integer[] pos = queue.poll();</span></span>
<span class="line"><span style="color:#24292E;">      </span></span>
<span class="line"><span style="color:#24292E;">        if (pos != null) {</span></span>
<span class="line"><span style="color:#24292E;">            // 取出当前点</span></span>
<span class="line"><span style="color:#24292E;">            x = pos[0]; y = pos[1]; z = pos[2];</span></span>
<span class="line"><span style="color:#24292E;">            // 如果遇到了目的地就立即返回步数</span></span>
<span class="line"><span style="color:#24292E;">            if (x == B[0] &amp;&amp; y == B[1]) {</span></span>
<span class="line"><span style="color:#24292E;">              return steps;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        // 朝四个方向尝试</span></span>
<span class="line"><span style="color:#24292E;">        for (int d = 0; d </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> 4; d++) {</span></span>
<span class="line"><span style="color:#24292E;">            int i = x + dx[d], j = y + dy[d];</span></span>
<span class="line"><span style="color:#24292E;">          </span></span>
<span class="line"><span style="color:#24292E;">            if (!isSafe(maze, i, j, z, visited)) {</span></span>
<span class="line"><span style="color:#24292E;">                continue;</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">          </span></span>
<span class="line"><span style="color:#24292E;">            // 如果在当前层遇到了墙，尝试打通它</span></span>
<span class="line"><span style="color:#24292E;">            int k = getLayer(maze, w, i, j, z);</span></span>
<span class="line"><span style="color:#24292E;">          </span></span>
<span class="line"><span style="color:#24292E;">            if (k &gt;= 0) {</span></span>
<span class="line"><span style="color:#24292E;">                // 如果能打通墙，就在下一层尝试</span></span>
<span class="line"><span style="color:#24292E;">                visited[i][j][k] = true;</span></span>
<span class="line"><span style="color:#24292E;">                queue.add(new Integer[] {i, j, k});</span></span>
<span class="line"><span style="color:#24292E;">            }</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      } else {</span></span>
<span class="line"><span style="color:#24292E;">        steps++;</span></span>
<span class="line"><span style="color:#24292E;">        </span></span>
<span class="line"><span style="color:#24292E;">        if (!queue.isEmpty()) {</span></span>
<span class="line"><span style="color:#24292E;">            queue.add(null);</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">      }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    return -1;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><br><p>注意：</p><ul><li><p>初始化队列的时候，除了把在第一层里的起始点 A 加入到队列中，还加入了一个 null，这是使用 BFS 的一个小技巧，用来帮助我们计算当前遍历了多少步数。</p></li><li><p>其中，利用 getLayer 函数判断是否遇到了墙壁，以及是否能打通墙壁到下一层。</p></li><li><p>最后，如果当前点是 null，表明已经处理完当前的步数，继续下一步。</p></li></ul><br><p>getLayer 函数的代码实现如下。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">int getLayer(int[][] maze, int w, int x, int y, int z) {</span></span>
<span class="line"><span style="color:#E1E4E8;">    if (maze[x][y] == -1) {</span></span>
<span class="line"><span style="color:#E1E4E8;">        return z </span><span style="color:#FDAEB7;font-style:italic;">&lt;</span><span style="color:#E1E4E8;"> w ? z + 1 : -1;</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">    return z;</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">int getLayer(int[][] maze, int w, int x, int y, int z) {</span></span>
<span class="line"><span style="color:#24292E;">    if (maze[x][y] == -1) {</span></span>
<span class="line"><span style="color:#24292E;">        return z </span><span style="color:#B31D28;font-style:italic;">&lt;</span><span style="color:#24292E;"> w ? z + 1 : -1;</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">    return z;</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><p>getLayer 的思想很简单，如果当前遇到的是一堵墙，那么看打通的墙壁个数是否已经超出了规定，如果没有，就继续打通它，否则返回 -1。另外，如果当前遇到的不是一堵墙，就继续在当前的平面里进行 BFS。</p><h6 id="结语" tabindex="-1">结语 <a class="header-anchor" href="#结语" aria-label="Permalink to &quot;结语&quot;">​</a></h6><p>这节课学习了深度优先和广度优先这两种搜索算法。它们都是算法面试中常考的知识点。建议对二者比较学习。</p><p>LeetCode 上对 DFS 以及 BFS 有非常好的分类和题库，而且对于时间复杂度和空间复杂度都有考察，是很好的练手的平台，希望大家多多练习。</p><br>`,14);function ss(ns,as,ls,ps,es,os){const a=o("Image");return t(),c("div",null,[E,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkYuANIhxAAB2CBZsYLQ484.png"}),n(),r,y,d,h,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAAZhkABsNRVtft9s555.gif"}),n(),u,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAHhJWACv4GjTZRBQ760.gif"}),n(),g,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkYyAO9LVACEhHBdbKfc149.gif"}),n(),m,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAc3T6ACUuR_5lcvw842.gif"}),n(),f,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkYyAYBQ4AA7A5yscltI499.gif"}),n(),_,A,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkYyAe__KABAUImf6ENE708.gif"}),n(),B,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkY2ACNi3AEWj2_BWcsM296.gif"}),n(),b,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkY2ABY_CAD5yLy-V6CM016.gif"}),n(),k,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkY2AHiebAEZJ2pzOuiQ289.gif"}),n(),x,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkY6AMrbOAC9gCtQSDyg193.gif"}),n(),C,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkZCAb7O6ACq7mfesvtU046.gif"}),n(),z,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkZGAcNsZACm2oC7I53I299.gif"}),n(),I,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkZKAUYofADryI0IEla8177.gif"}),n(),S,F,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/23/CgoB5l2IkZOAZAaTAAEnEYY55UA254.png"}),n(),q,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkZmAUAsQAOl9ssa2zxE177.gif"}),n(),l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkZ6AEp2BAOF4o1jndN0409.gif"}),n(),D,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkaSAJZTIAOVn4eGgEXc393.gif"}),n(),v,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/43/CgotOV2IkamAazS1ANB4kNxFNT4453.gif"}),n(),j,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkamAcHHCAAB2vDyOBsk961.png"}),n(),V,M,O,w,T,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkaqAMe91ACG_XqSE0yA958.gif"}),n(),P,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkayAaGfVAETtH2VWV-A751.gif"}),n(),N,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2Ika-AOPRWAHRFIVXcPQI792.gif"}),n(),L,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkbGAMV2kAC8Ltvwuc5g827.gif"}),n(),K,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbKAceIeADfsJWqxiZA916.gif"}),n(),G,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkbOACo8JABbKDt0EN50653.gif"}),n(),H,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbWATgK5ACuDZM3dEJw749.gif"}),n(),Y,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbaAW9IfACOEixVhbyA516.gif"}),n(),Z,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbeAHpX6AB3ZQSZ7XbM801.gif"}),n(),U,Q,X,R,J,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkbuAIX0lAHdOXp_zsxE546.gif"}),n(),W,l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkcCAWjRjALszKfUEV7A310.gif"}),n(),l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/24/CgoB5l2IkcOAd-giAItzJVPUNUM375.gif"}),n(),l(a,{alt:"",src:"http://s0.lgstatic.com/i/image2/M01/91/44/CgotOV2IkcaAI78RAHjv2Tul3JY991.gif"}),n(),$])}const is=e(i,[["render",ss]]);export{cs as __pageData,is as default};
