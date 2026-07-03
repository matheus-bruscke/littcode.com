---
title: Cleaning up useEffects in React
slug: cleaning-up-useeffects-in-react
cover: "[[cleaing-use-effects-cover.png]]"
date: 2026-06-23T21:32:00
tags:
  - react
  - performance
headline: " Learn when and why to clean up React useEffect hooks"
---
`useEffect` is one of those hooks that's easy to reach for and surprisingly easy to misuse. If you've ever shipped a component that fetches data twice, fires stale callbacks, or triggers an infinite re-render loop, welcome to the club. The good news: most `useEffect` pain points follow predictable patterns, and once you spot them, you can't unsee them.

This post covers the habits that separate messy effects from clean ones, with examples you can steal directly.

---

## 1. Always Return a Cleanup Function (When It Matters)

Every effect that *sets something up* should *tear it down*. Subscriptions, timers, event listeners, and open connections all need cleanup, otherwise you're leaking memory and potentially calling state setters on unmounted components.

**The messy version:**

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setTick(t => t + 1);
  }, 1000);
  // interval runs forever, even after the component unmounts
}, []);
```

**The clean version:**

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    setTick(t => t + 1);
  }, 1000);

  return () => clearInterval(interval); // goodbye interval
}, []);
```

Same idea applies to event listeners:

```jsx
useEffect(() => {
  const handleResize = () => setWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);

  return () => window.removeEventListener('resize', handleResize);
}, []);
```

The cleanup function runs before the next effect fires *and* when the component unmounts. Think of it as the effect's destructor.

---

## 2. Take Your Dependency Array Seriously

The dependency array isn't a suggestion: it's a contract. You're telling React: *"re-run this effect whenever one of these values changes."* Lying about your dependencies (by omitting things) leads to bugs that are genuinely hard to track down.

**Don't do this:**

```jsx
useEffect(() => {
  fetchUserData(userId); // userId is used but not listed
}, []); // ← stale closure: userId never updates
```

**Do this instead:**

```jsx
useEffect(() => {
  fetchUserData(userId);
}, [userId]); // re-fetches when userId changes
```

If your linter (with `eslint-plugin-react-hooks`) is yelling at you about missing dependencies, listen to it. The rule exists because the cost of a missing dep is almost always worse than the cost of one extra re-run.

> **One exception:** if you *genuinely* only want something to run once on mount, an empty `[]` is fine, just make sure you're not secretly relying on a prop or state variable inside the effect.

---

## 3. Avoid Infinite Loops

This one bites everyone at least once. The classic trap: you update state inside an effect, but that state is also in the dependency array.

```jsx
// infinite loop
useEffect(() => {
  setData(transform(data)); // updates data...
}, [data]); // ...which triggers this effect again
```

Usually the fix is to think more carefully about what you actually need in the dependency array, or to restructure the logic entirely. If you're deriving a value from state, you probably don't need an effect at all (more on this below).

Another common variant: creating objects or functions inside the component and referencing them as dependencies.

```jsx
// 💀 also an infinite loop
const options = { page: 1, limit: 10 }; // new object reference every render

useEffect(() => {
  fetchData(options);
}, [options]); // always "changed" because it's a new object
```

Fix this by memoizing with `useMemo`, moving the object outside the component, or including the primitive values directly:

```jsx
// stable dependencies
useEffect(() => {
  fetchData({ page: 1, limit: 10 });
}, []); // or [page, limit] if they're dynamic
```

---

## 4. Don't Use Effects for Derived State

This is probably the most common overuse of `useEffect`. If you can compute something from existing props or state during render, just... do that. No effect needed.

**Unnecessary effect:**

```jsx
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [fullName, setFullName] = useState('');

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);
```

**Clean version:**

```jsx
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');

const fullName = `${firstName} ${lastName}`; // just compute it
```

Fewer effects, fewer renders, less state to manage. Win-win-win.

---

## 5. Handle Async Effects Properly

You can't make the `useEffect` callback itself async, but you can define and immediately call an async function inside it. Just make sure you handle the case where the component unmounts *before* the async work finishes.

**The naive approach (buggy):**

```jsx
useEffect(() => {
  fetch(`/api/users/${userId}`)
    .then(res => res.json())
    .then(data => setUser(data)); // might run after unmount
}, [userId]);
```

**Clean approach with AbortController:**

```jsx
useEffect(() => {
  const controller = new AbortController();

  async function loadUser() {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        signal: controller.signal,
      });
      const data = await res.json();
      setUser(data);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    }
  }

  loadUser();

  return () => controller.abort(); // cancel the request on cleanup
}, [userId]);
```

`AbortController` cancels in-flight requests and the `AbortError` is silently ignored, so you don't get spurious error states when a component unmounts mid-fetch.

---

## 6. One Concern Per Effect

Resist the urge to stuff multiple unrelated things into one effect. If they serve different purposes, split them up. It makes each effect easier to reason about and easier to clean up independently.

**Harder to follow:**

```jsx
useEffect(() => {
  document.title = `${user.name}'s Profile`;

  const socket = connectSocket(user.id);
  socket.on('message', handleMessage);

  return () => socket.disconnect();
}, [user]);
```

**Cleaner:**

```jsx
useEffect(() => {
  document.title = `${user.name}'s Profile`;
}, [user.name]);

useEffect(() => {
  const socket = connectSocket(user.id);
  socket.on('message', handleMessage);

  return () => socket.disconnect();
}, [user.id, handleMessage]);
```

Now each effect has a single responsibility, and you can update or remove one without touching the other.

---

## 7. Extract Complex Effects into Custom Hooks

When an effect gets long or you're reusing the same logic in multiple components, it's a sign you should pull it into a custom hook. This doesn't change any of the rules, it just improves readability and reuse.

```jsx
function useDocumentTitle(title) {
  useEffect(() => {
    const previous = document.title;
    document.title = title;

    return () => {
      document.title = previous; // restore on unmount
    };
  }, [title]);
}

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}
```

Usage becomes trivial:

```jsx
function ProfilePage({ user }) {
  useDocumentTitle(`${user.name}'s Profile`);
  const width = useWindowWidth();

  return <div>...</div>;
}
```

The component doesn't need to know how any of it works — it just consumes a clean API.

---

## Quick Reference

| Situation | What to do |
|---|---|
| Setting up a subscription or listener | Always return a cleanup function |
| Using a prop/state variable inside the effect | Add it to the dependency array |
| Computing a value from props/state | Skip the effect, just compute it during render |
| Running async work (fetch, etc.) | Use an inner async function + AbortController |
| Multiple unrelated things in one effect | Split into separate effects |
| Repeated effect logic across components | Extract into a custom hook |

`useEffect` is powerful precisely because it lets you step outside React's rendering model and interact with the world. That power comes with some responsibility: understanding the cleanup lifecycle, being honest with the dependency array, and knowing when *not* to use an effect at all. Get those right, and your effects will stop being the source of your weirdest bugs.