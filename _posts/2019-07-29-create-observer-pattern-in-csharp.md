---
title: 使用 ReactiveX 建立 Observer Pattern 
tags: DotNetCore
tagline: 
---

直接上 code

## Install

```console
dotnet add package System.Reactive
```

## using

```cs
using System.Reactive;
using System.Reactive.Subjects;
```

## Observable

```cs
public class ObjectObservable : ObservableBase<object>
{
    private readonly Subject<object> _subject = new Subject<object>();

    public void Submit(object item)
    {
        _subject.OnNext(item);
    }

    protected override IDisposable SubscribeCore(IObserver<object> observer)
    {
        return _subject.Subscribe(observer);
    }
}
```

## Observer

```cs
public class ObjectObserver : ObserverBase<object>, IDisposable
{
    private IDisposable _cancellation;

    public void Subscribe(IObservable<object> provider)
    {
        _cancellation = provider.Subscribe(this);
    }

    public void Dispose()
    {
        _cancellation.Dispose();
        _cancellation = null;
    }

    protected override void OnNextCore(object item)
    {
        //when call "OnNext"...
    }

    protected override void OnErrorCore(Exception error)
    {
        throw error;
    }

    protected override void OnCompletedCore()
    {
        //when call "OnCompleted" or "Dispose"...
    }
}
```

## HOW TO

```cs
var observable = new ObjectObservable()

observable.Submit(new object());

var observer1 = new ObjectObserver();
var unsubscribe1 = observable.Subscribe(observer1);

observable.Submit(new object());

var observer2 = new ObjectObserver();
observable.Subscribe(observer2);

observable.Submit(new object());

//unsubscribe "observer1"
unsubscribe1.Dispose();
```
