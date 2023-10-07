import{_ as e,o as t,g as r,Q as p}from"./chunks/framework.4e7d56ce.js";const y=JSON.parse('{"title":"结束语TypeScript的这些实用技能，你不得不知","description":"","frontmatter":{},"headers":[],"relativePath":"posts/frontEnd/109-TypeScript 入门实战笔记文档/(7453) 结束语  TypeScript 的这些实用技能，你不得不知.md","filePath":"posts/frontEnd/109-TypeScript 入门实战笔记文档/(7453) 结束语  TypeScript 的这些实用技能，你不得不知.md","lastUpdated":1696338709000}'),a={name:"posts/frontEnd/109-TypeScript 入门实战笔记文档/(7453) 结束语  TypeScript 的这些实用技能，你不得不知.md"},o=p(`<h1 id="结束语typescript的这些实用技能-你不得不知" tabindex="-1">结束语TypeScript的这些实用技能，你不得不知 <a class="header-anchor" href="#结束语typescript的这些实用技能-你不得不知" aria-label="Permalink to &quot;结束语TypeScript的这些实用技能，你不得不知&quot;">​</a></h1><p>经过前面 20 讲的学习，我们已经了解了 TypeScript 从开发环境搭建、基础类型、高阶类型到业务实践的全链路知识。</p><p>最后一讲我们再一起对过往实用的技能、重点或者容易混淆的知识进行提炼汇总，查漏补缺。</p><h3 id="知识回顾" tabindex="-1">知识回顾 <a class="header-anchor" href="#知识回顾" aria-label="Permalink to &quot;知识回顾&quot;">​</a></h3><h4 id="number、string、boolean、symbol" tabindex="-1">Number、String、Boolean、Symbol <a class="header-anchor" href="#number、string、boolean、symbol" aria-label="Permalink to &quot;Number、String、Boolean、Symbol&quot;">​</a></h4><p>首先，我们来回顾一下初学 TypeScript 时，很容易和原始类型 number、string、boolean、symbol 混淆的首字母大写的 Number、String、Boolean、Symbol 类型，后者是相应原始类型的包裹对象，姑且把它们称之为对象类型。</p><p>从类型兼容性上看，原始类型兼容对应的对象类型，反过来对象类型不兼容对应的原始类型。</p><p>下面我们看一个具体的示例：</p><pre><code>let num: number;
let Num: Number;
Num = num; // ok
num = Num; // ts(2322)
</code></pre><p>在示例中的第 3 行，我们可以把 number 赋给类型 Number，但在第 4 行把 Number 赋给 number 就会提示 ts(2322) 错误。</p><p>因此，<strong>我们需要铭记不要使用对象类型来注解值的类型，因为这没有任何意义。</strong></p><h4 id="object、object-和" tabindex="-1">object、Object 和 {} <a class="header-anchor" href="#object、object-和" aria-label="Permalink to &quot;object、Object 和 {}&quot;">​</a></h4><p>另外，object（首字母小写，03 讲我们介绍过，以下称&quot;小 object&quot;）、Object（首字母大写，以下称&quot;大 Object&quot;）和 {}（以下称&quot;空对象&quot;）也是容易混淆的类型。</p><p>小 object 代表的是所有非原始类型，也就是说我们不能把 number、string、boolean、symbol 原始类型赋值给 object。<strong>在严格****模式下，null 和 undefined 类型也不能赋给 object。</strong></p><p>下面我们看一个具体示例：</p><pre><code>let lowerCaseObject: object;
lowerCaseObject = 1; // ts(2322)
lowerCaseObject = &#39;a&#39;; // ts(2322)
lowerCaseObject = true; // ts(2322)
lowerCaseObject = null; // ts(2322)
lowerCaseObject = undefined; // ts(2322)
lowerCaseObject = {}; // ok
</code></pre><p>在示例中的第 2~6 行都会提示 ts(2322) 错误，但是我们在第 7 行把一个空对象赋值给 object 后，则可以通过静态类型检测。</p><p>大Object 代表所有拥有 toString、hasOwnProperty 方法的类型，所以所有原始类型、非原始类型都可以赋给 Object。<strong>同样，在严格模式下，null 和 undefined 类型也不能赋给 Object。</strong></p><p>下面我们也看一个具体的示例：</p><pre><code>let upperCaseObject: Object;
upperCaseObject = 1; // ok
upperCaseObject = &#39;a&#39;; // ok
upperCaseObject = true; // ok
upperCaseObject = null; // ts(2322)
upperCaseObject = undefined; // ts(2322)
upperCaseObject = {}; // ok
</code></pre><p>在示例中的第 2~4 行、第 7 行都可以通过静态类型检测，而第 5~6 行则会提示 ts(2322) 错误。</p><p>从上面示例可以看到，大 Object 包含原始类型，小 object 仅包含非原始类型，所以大 Object 似乎是小 object 的父类型。实际上，大 Object 不仅是小 object 的父类型，同时也是小 object 的子类型（回想 15 讲中我们实现的判断两个类型是否相等的工具泛型 isEqualV3，其实就是区分不了大 Object 和小 object）。</p><p>下面我们还是通过一个具体的示例进行说明。</p><pre><code>type isLowerCaseObjectExtendsUpperCaseObject = object extends Object ? true : false; // true
type isUpperCaseObjectExtendsLowerCaseObject = Object extends object ? true : false; // true
upperCaseObject = lowerCaseObject; // ok
lowerCaseObject = upperCaseObject; // ok
</code></pre><p>在示例中的第 1 行和第 2 行返回的类型都是 true，第3 行和第 4 行的 upperCaseObject 与 lowerCaseObject 可以互相赋值。</p><blockquote><p><strong>注意：尽管官方文档说可以使用小 object 代替大 Object，但是我们仍要明白大 Object 并不完全等价于小 object。</strong></p></blockquote><p>{}空对象类型和大 Object 一样，也是表示原始类型和非原始类型的集合，并且在严格模式下，null 和 undefined 也不能赋给 {} ，如下示例：</p><pre><code>let ObjectLiteral: {};
ObjectLiteral = 1; // ok
ObjectLiteral = &#39;a&#39;; // ok
ObjectLiteral = true; // ok
ObjectLiteral = null; // ts(2322)
ObjectLiteral = undefined; // ts(2322)
ObjectLiteral = {}; // ok
type isLiteralCaseObjectExtendsUpperCaseObject = {} extends Object ? true : false; // true
type isUpperCaseObjectExtendsLiteralCaseObject = Object extends {} ? true : false; // true
upperCaseObject = ObjectLiteral;
ObjectLiteral = upperCaseObject;
</code></pre><p>在示例中的第 8 行和第 9 行返回的类型都是 true，第10 行和第 11 行的 ObjectLiteral 与 upperCaseObject 可以互相赋值，第2~4 行、第 7 行的赋值操作都符合静态类型检测；而第5 行、第 6 行则会提示 ts(2322) 错误。</p><p><strong>综上结论：{}、大 Object 是比小 object 更宽泛的类型（least specific），{} 和大 Object 可以互相代替，用来表示原始类型（null、undefined 除外）和非原始类型；而小 object 则表示非原始类型。</strong></p><blockquote><p>这里插播一道思考题：基于以上总结，请实现一个能够区分大 Object 和小 object 的 isEqualV4。</p></blockquote><h4 id="严格与非严格模式" tabindex="-1">严格与非严格模式 <a class="header-anchor" href="#严格与非严格模式" aria-label="Permalink to &quot;严格与非严格模式&quot;">​</a></h4><p>关于静态类型检测的工作模式，在课程中我们也经常提到严格和非严格模式的区别，实际上最让人困惑的是 strictNullChecks 和 strictFunctionTypes 这两个设置。</p><p>strictNullChecks 影响的是 null、undefined 与其他类型的兼容性问题，比如上边提到，开启 strictNullChecks 时，null、undefined 不兼容大、小 object 和 {}，但关闭 strictNullChecks 时，它们又是兼容的。</p><p>strictFunctionTypes 则影响的是函数类型检测，开启 strictFunctionTypes 时，函数参数是逆变的，而关闭 strictFunctionTypes 时，函数参数则变成了双向协变。</p><p><strong>因此</strong> ，在 TypeScript 的所有项目中使用严格模式（尤其是以上两个配置），实际上可以降低心智成本。<strong><strong>在实</strong></strong>际工作中，我们只需要理解 TypeScript 在严格模式下的特性并严格遵循，代码就是类型安全的。</p><h4 id="类型增强" tabindex="-1">类型增强 <a class="header-anchor" href="#类型增强" aria-label="Permalink to &quot;类型增强&quot;">​</a></h4><p>在 TypeScript 中，如果文件包含顶层的 export 或者 import，则会被当作 module，在 module 中定义的、没有显式 export 的变量、函数、类对外都不可见；相反，如果文件不包含顶层的 export 或者 import，则会被当作 script，script 里的内容（类型声明、变量声明）都是全局可见的（对 module 也是可见的）。</p><p>这就是为什么使用同样的语法进行人工补齐类型声明时，有的类型声明在其他的模块、文件中无需显式 import 就可以直接使用，而有的类型声明必须显式 import 之后才可以使用。</p><p><strong>需要注意</strong>：因为 script 中的内容都是全局可见的，一方面我们应该避免定义过多全局类型，另一方面也要使用足够特性化的唯一标识来命名全局类型，从而避免全局命名污染。</p><p>下面看一个具体的示例：</p><pre><code>// myAugmention.ts
namespace MyNameSpaceExample {
export type id = number; // 此处非顶层 export
export type name = string;
}
type TSCourseUserInfoName = string;
</code></pre><p>在示例中的第 2~4 行，我们使用了 namespace 组织 id、name 等比较容易出现命名冲突的类型（namespace 中只有显式 export 的成员才对外可见），然后在第 6 行命名了一个足够特性化的全局 TSCourseUserInfoName。接下来我们就可以在任何其他地方通过类型名、命名空间名 + 类型名访问全局类型。</p><p><strong>此外，为了避免其他人在 myAugmention.ts 中添加顶层 export 或者 import，导致 script 变 module、类型全局可见性被破坏，我们可以显式添加描述信息，比如标明&quot; script 文件，请勿添加顶层 export 或者 import&quot;。<strong><strong>反过</strong></strong>来，我们也可以在 script 中添加&quot;export {}&quot;，显式地把 script 改为 module，避免类型全局污染。</strong></p><p>如果我们确实想让 module 中的类型全局可见，则可以使用 declare global 声明全局类型，如下示例：</p><pre><code>// myGlobalModule.ts
declare global {
type GlobalUserId = number;
}
</code></pre><p>在示例中的第 2~4 行，我们声明了可以在任何地方访问的全局类型 GlobalUserId（如果你们的示例中只有这么几行代码，肯定访问不到 GlobalUserId）。</p><p>下面我们再来回顾一下类型断言的一般性原则。</p><h4 id="类型断言" tabindex="-1">类型断言 <a class="header-anchor" href="#类型断言" aria-label="Permalink to &quot;类型断言&quot;">​</a></h4><p>对于复杂类型而言，父子类型可以互相断言；对于原始类型 number、string、boolean 而言，属于同一原始类型的字面量类型以及字面量类型组成的联合类型也可以互相断言，如下示例：</p><pre><code>let NumberLiteral1: 1 = 1;
let NumberLiteral2: 2 = 2;
let StringLiterala: &#39;a&#39; = &#39;a&#39;;
let StringLiteralb: &#39;b&#39; = &#39;b&#39;;
let MixedLiteral1: typeof NumberLiteral1 \\| typeof StringLiterala = 1;
let MixedLiteral2: typeof NumberLiteral2 \\| typeof StringLiteralb = 2;
NumberLiteral1 = NumberLiteral2 as 1; // ok
NumberLiteral2 = NumberLiteral1 as 2; // ok
StringLiterala = StringLiteralb as &#39;a&#39;; // ok
StringLiteralb = StringLiterala as &#39;b&#39;; // ok
MixedLiteral1 = MixedLiteral2 as typeof MixedLiteral1; // ok
MixedLiteral2 = MixedLiteral1 as typeof MixedLiteral2; // ok
</code></pre><p>在示例中的第 7~12 行的类型断言虽然都符合静态类型检测，却没有任何实际的意义，并且不安全。</p><p>以上是对本专栏的重难点回顾，接下来我们了解一下 TypeScript 最近一段时间新增的重要特性。</p><h3 id="typescript-新特性和变更" tabindex="-1">TypeScript 新特性和变更 <a class="header-anchor" href="#typescript-新特性和变更" aria-label="Permalink to &quot;TypeScript 新特性和变更&quot;">​</a></h3><p>TypeScript 迭代十分活跃，至本课程截稿已经发布了 4.0、4.1、4.2 版本，以下我按照版本号整理了部分新增特性和 break changes。</p><h4 id="_4-0可变元组" tabindex="-1"><strong>4.0</strong>可变元组 <a class="header-anchor" href="#_4-0可变元组" aria-label="Permalink to &quot;**4.0**可变元组&quot;">​</a></h4><p>03 讲中我们学习了元组的定义：元素类型、个数确定的数组即元组，在 TypeScript 4.0 版本中，新引入了两处功能性的变更支持可变元组：</p><ul><li><p>第一个变更是在元组类型的语法中，我们可以对泛型使用展开运算符，如以下示例第 4 行（注意：TypeScript 4.0 以下版本会提示 ts(1256) 错误）；</p></li><li><p>另外一个变更是可以在元组中的任何位置使用剩余元素，如以下示例第 8 行所示。</p><p>const TupleA = [&#39;A&#39;] as const; const TupleB = [&#39;B&#39;] as const; type TupleType = readonly any[]; function concat&lt;T extends TupleType, U extends TupleType&gt;(arr1: T, arr2: U): [...T, ...U] { // ts(1256) return [...arr1, ...arr2]; // ts(2741) } const TupleC = concat(TupleA, TupleB); // [&#39;A&#39;, &#39;B&#39;] type ConcatedTuple = [ ...(typeof TupleA), ...(typeof TupleB)];</p></li></ul><p>可变元组的引入，使得我们可以极其方便地实现一些有意思的功能，比如合并两个元组为一个新的元组的函数，在上述示例中的第 7 行，我们调用了第 4~6 行定义的函数 concat 合并元组 [&#39;A&#39;] 和 [&#39;B&#39;] ，从而得到了新的元组类型 [&#39;A&#39;, &#39;B&#39;] 。如果没有可变元组（比如 在 TypeScript 3.9 中），我们就需要给函数 concat 编写 m * n 个重载类型，比如支持长度为 5 的元组合并就需要编写 25 个类型重载。</p><p>可变元组还可以极大地提升函数式编程的类型体验和可能性，我们可以在函数组合中使用可变元组约束高阶函数入参和返回值的类型，比如对 JavaScript 内置 bind 方法更好地进行类型检测支持。</p><h4 id="_4-0-元组元素标签" tabindex="-1">4.0 元组元素标签 <a class="header-anchor" href="#_4-0-元组元素标签" aria-label="Permalink to &quot;4.0 元组元素标签&quot;">​</a></h4><p>另外一个元组相关的变更是我们可以在元组类型的定义中给元素指定标签，让代码更具语义化、可读性，如下示例：</p><pre><code>type LabeledTupleType = [id: number, name: string];
</code></pre><p>在示例中的第 1 行，我们给元组的两个元素分别指定了 id 和 name 的标签。</p><p>接下来，我们了解一下 4.1 版本中的新特性和变更。</p><h4 id="_4-1模板字面量类型" tabindex="-1"><strong>4.1</strong>模板字面量类型 <a class="header-anchor" href="#_4-1模板字面量类型" aria-label="Permalink to &quot;**4.1**模板字面量类型&quot;">​</a></h4><p>不得不说，模板字面量类型是 4.1 版本中非常有创造力和想象力的新特性，它使得字符串类型也具备了可变可运算的能力。</p><p>我们可以基于已有的字符串字面量衍生出新的字面量类型，也就是说既可以使用模板语法拼接字符串，也可以使用内置工具函数对模板变量进行转换，如下示例：</p><pre><code>type PrefixType\\&lt;P extends string, N extends string&gt; = \`\${P}/\${Capitalize&lt;string &amp; N&gt;}\`;
type UserLoginAction = PrefixType&lt;&#39;User&#39;, &#39;login&#39;&gt;; // &#39;User/Login&#39;
</code></pre><p>示例中的第 1 行，因为我们定义了泛型 PrefixType，它可以接收字符串类型入参 P 和 N，并以&quot;P + / + 首字母大写 N &quot;的格式返回，所以第 2 行入参是 &#39;User&#39; 和 &#39;login&#39; 时，返回的类型是 &#39;User/Login&#39;。</p><p>回想一下在 18 讲中介绍的组件和 Redux 类型化中提到的路由属性和 action type，我们就可以基于模板字符串类型实现更全面的类型化。</p><p>我们可以将路由属性中的 params 参数对象和路由字符串规则关联起来，比如将 { id: string; name: string}和&quot;user/:id/:name/&quot;进行关联。同样，我们也可以更方便地将 Redux 中的 action name 和 action type 关联起来，比如将 doLogin 和 &#39;user&#39;/&#39;login&#39; 进行关联。</p><h4 id="_4-1-映射类型键名重新映射" tabindex="-1">4.1 映射类型键名重新映射 <a class="header-anchor" href="#_4-1-映射类型键名重新映射" aria-label="Permalink to &quot;4.1 映射类型键名重新映射&quot;">​</a></h4><p>4.1 版本另一个重要的特性：在映射类型中，我们可以使用 as 操作符对键名重新映射（可以理解为针对类型的类型断言），如下示例：</p><pre><code>type Getters = {
[K in keyof T as \`get\${Capitalize&lt;string &amp; K&gt;}\`]: () =&gt; T[K];
};
type UserInfoGetters = Getters&lt;{ id: number; name: string; }&gt;
</code></pre><p>在示例中的第 2 行，因为我们提取了入参 T 的属性名，并将其重新映射为&quot;get&quot;前缀+属性名首字母大写拼接格式的新属性名，然后作为返回新类型的属性，所以第三行返回的类型是 { getId: number; getName: string; }。</p><p>接下来我们看一下本课程截稿前发布的最新版本（ 4.2 版本）的新特性。</p><h4 id="_4-2元组头部-中间剩余元素" tabindex="-1"><strong>4.2</strong>元组头部/中间剩余元素 <a class="header-anchor" href="#_4-2元组头部-中间剩余元素" aria-label="Permalink to &quot;**4.2**元组头部/中间剩余元素&quot;">​</a></h4><p>在 4.2 版本中，我们可以在元组的任何地方使用剩余元素表达式，而不再仅仅局限于元组的尾部，如下示例：</p><pre><code>let prefixRestTuple: [...rest: string[], number] = [&#39;a&#39;, &#39;b&#39;, 1];
let middleRestTuple: [boolean, ...rest: string[], number] = [true
,&#39;a&#39;, &#39;b&#39;, 1];
</code></pre><p>在示例中的第 1 行，我们在元组的头部定义了剩余元素。第 2 行，我们在元组的中间位置定义了剩余元素。</p><h4 id="_4-2-yield-表达式提示-noimplicitany-错误" tabindex="-1">4.2 yield 表达式提示 noImplicitAny 错误 <a class="header-anchor" href="#_4-2-yield-表达式提示-noimplicitany-错误" aria-label="Permalink to &quot;4.2 yield 表达式提示 noImplicitAny 错误&quot;">​</a></h4><p>在 TypeScript 的 4.2 版本中，另一个有用而颇具破坏性的特性是，必须显式注解 yield 表达式的返回值类型，否则会提示 noImplicitAny 错误。</p><p>这个变更极有可能影响第 18 讲&quot;TypeScript Web 开发&quot;中提到的使用 Redux-saga 管理副作用的 Redux 类型化方案。如果之前我们在 Redux-saga 副作用函数中没有显式指定 yield 表达式返回值类型，那么 TypeScript 升级为 4.2 版本之后就需要重构代码，并补全缺失的返回值类型。</p><p>以上就是我觉得有必要单独补充和同步的 TypeScript 官方新特性和变更。</p><p>从这些新特性和变更中我们不难发现，实际上所有的变更都是朝着愈发严格而全面的类型安全目标演进的。因此，我们与其被动地重构代码，以兼容愈发严格的静态类型检测，不如从学习使用 TypeScript 之初就启用严格模式，以追求最高标准，养成好习惯。这也是我在整个专栏期间最中肯的建议和最执着的要求，当然也是最好的实践。</p><p>注意：TypeScript 更新快，特性日新月异，我们可以通过官方文档的发版日志模块获取更多详细信息，详见[链接]。</p><h3 id="寄语" tabindex="-1">寄语 <a class="header-anchor" href="#寄语" aria-label="Permalink to &quot;寄语&quot;">​</a></h3><p>以上就是这一讲的全部内容，感谢你坚持到最后一讲。</p><p>这门课程的学习过程，对你们而言是一场有意义的 TypeScript 学习之旅，对我自己而言也同样是一场有意义的系统性复习和总结之旅。</p><p>最后，感谢大家的支持，希望我总结的经验能帮助你更快、更好地了解和掌握 TypeScript，愿严格安全的静态类型保佑你！</p>`,91),n=[o];function i(s,c,l,b,u,d){return t(),r("div",null,n)}const j=e(a,[["render",i]]);export{y as __pageData,j as default};
