---
date: 2020-01-28T15:21:26.430Z
description: >-
  When does it make sense to use a Class strictly as a data structure in
  JavaScript?
keywords:
  - ECMA Script
title: 'JavaScript Performance:  Class Data Structures vs. Objects'
---
## Preamble

In July and August of 2019, I did a round of interviews and changed companies. During one of the interviews, I wrote some code that looked something like this:

```javascript
class User {
  constructor(name, age, sex, location) {
    this.name = name;
    this.age = age;
    this.sex = sex;
    this.location = location;
  }
}

const user1 = new User("Guybrush Threepwood", 30, "m", "Monkey Island");
const user2 = new User("Bilbo Baggins", 106, "m", "Middle Earth");
```

My thinking was two fold

1. I want to create a data structure that has a consistent contract that I can rely on in future code.
2. Keys in an object are separate strings for every string, while fields on a class are stored on the prototype. This means there is potential for a memory performance advantage when using class fields as more strictly-typed key-value data structures.

One of my interviewers engaged on this, asserting that I was working on some bad assumptions. Specifically, any reduction in memory that I might obtain was eaten up in the overhead of using a heavier object like a class. We had an awkward moment. I thanked him for the interview and went on my way. Interviews are one of those "best foot forward" kind of times, and this did not feel like my best foot forward. It felt rough.

## Getting into it

So, what gives? Is a class really a performance hole when used as a glorified hashmap? Let's find out. First, a couple of givens.

1. Yes, classes and inheritance in ECMA Script don't work like other OO languages, yes, ECMA Script uses prototypal inheritance.
1. Use cases vary wildly. Simple benchmarking like what I'm doing here might not be representative of your implementation.
1. I'm testing one-offs in the developer console in Brave `1.2.42`.
1. This is not a deep dive into JavaScript execution in all environments. If you really wanted to thoroughly benchmark something like this, you'd probably build a testing framework and replicate the test thousands of times in all the major JavaScript environments (a bunch of browsers, Node, maybe Deno if you're feeling frisky) and get your data that way. While this would be interesting, it is outside of the scope of what I was trying to do, which is mostly satisfying my curiosity after what felt like a rough interview.

The good news (at least with the last point) is that this is easy to reproduce and adapt. Moving forward.

Let's make really big arrays of two data structures: one made with a plain old object and one made with a class, like so:

```javascript
function buildArray(callback) {
  const array = [];
  
  for (let i = 0; i < 1000000; i++){
    array.push(callback(i));
  }

  return array;
}

function buildObject(i) {
  return { aReallyLongKeyNameHereForTheSakeOfTheExample: i };
}

class ClassTest {
  constructor(i) {
    this.aReallyLongKeyNameHereForTheSakeOfTheExample = i;
  } 
}

const objectArray = buildArray(buildObject);
const classArray = buildArray(i => new ClassTest(i));
```

Alright. Profiler time. How do the two methods stack up?

![Profile of array of 1,000,000 hashmap objects](/static/img/object_vs_class_as_hashmap_-_object_array.png "1,000,000 hashmap object array")

![Profile of array of 1,000,000 hashmap class instances](/static/img/object_vs_class_as_hashmap_-_class_instance_array.png "1,000,000 hashmap class instance array")

So, what are we seeing here?

1. Using a class is actually faster over the course of building a 1,000,000 element array.
2. The garbage collector starts working earlier and works more sparsely when making an array of hashmap objects.
3. The interpreter does a round of dedicated cleanup after building the class instance array.

Let's look at memory usage. Generating an array of hashmap objects takes us from an ambient 4.9 MB on the JS heap to 57.1 MB. Quick note: that's almost the total amount of RAM I had in my second desktop machine (64 MB was respectable in 1997). Generating an array of class instances takes from an ambient 5.0 MB on the JS heap to 59.3 MB. Here are all the numbers again.

<table>
  <thead>
  <tr>
    <td>Array Type</td>
    <td>Execution Time (ms)</td>
    <td>Heap Start (MB)</td>
    <td>Heap End (MB)</td>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Object Hashmap</td>
    <td>297</td>
    <td>4.9</td>
    <td>57.1</td>
  </tr>
  <tr>
    <td>Class Instance</td>
    <td>221</td>
    <td>5.0</td>
    <td>59.3</td>
  </tr>
  </tbody>
</table>

## Takeaways

So, what do we learn from this? With a sampling of 1 (not entirely true; I've run this a few times with similar results in Chromium-based browsers, but still not enough time to be qualify as rigorous testing and to earn the badge of statistical significance). Here we go.

1. As always, computing is a tradeoff between CPU time and memory usage. Class instances, in my use case, executed faster but took more memory.
1. Before hard committing to using classes as a data structure, it's good to think about development costs in maintenance for any approach you take. If you're this committed to using more formal data structures than plain old JavaScript objects maybe it's time to look at TypeScript.
