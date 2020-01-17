---
date: 2020-01-16T23:21:26.430Z
title: 'JavaScript Performance:  Class Data Structures vs. Objects'
description: >-
  When does it make sense to use a Class strictly as a data structure in
  JavaScript?
---
## Preamble

In July and August of 2019, I did a round of interviews and changed companies. During one of the interviews, I wrote some code that looked something like this:

```
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

One of my interviewers engaged on this, asserting that I was working on some bad assumptions. Specifically, any reduction in memory that I might obtain was eaten up in the overhead of using a heavier object like a class. We had an awkward moment. I thanked him for the interview and went on my way. Interviews are one of those "best foot forward" kind of times, and this did not feel like my best foot forward. It felt bad.

