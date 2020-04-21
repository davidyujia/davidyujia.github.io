---
title: 在 docker desktop 上的 k8s 使用 dashboard
tags: docker
tagline: 
---

首先先勾選選項啟動 k8s

![docker-desktop-k8s-setting][1]

再來從 [kubernetes dashboard releases][2] 選擇 k8s dashboard 版本，這裡使用 v1.10.1

打開 powershell 輸入

```ps
kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v1.10.1/src/deploy/recommended/kubernetes-dashboard.yaml
```

執行 `kubectl proxy`, 接著 command-line 上會顯示

```ps
Starting to serve on 127.0.0.1:8001
```

接著我們可以打開 web browser 連到 <http://localhost:8001/api/v1/namespaces/kube-system/services/https:kubernetes-dashboard:/proxy/> 則會出現登入畫面, 可以使用 kubeconfig 或 token 登入

![k8s-dashboard-login][3]

直接輸入下面指令直接取得 token

```ps
kubectl -n kube-system describe secret default
```

config 可以在 `%USERPROFILE%\.kube` 下找到, 不過試了幾個方式還沒成功, 所以這邊直接複製 token 登入

之後就可以看到 dashboard 的畫面了

![k8s-dashboard][4]

[1]: /assets/images/article/2020-04-19-k8s-dashboard-in-docker-dasktop/docker-desktop-k8s-setting.png

[2]: https://github.com/kubernetes/dashboard/releases

[3]: /assets/images/article/2020-04-19-k8s-dashboard-in-docker-dasktop/k8s-dashboard-login.png

[4]: /assets/images/article/2020-04-19-k8s-dashboard-in-docker-dasktop/k8s-dashboard.png
