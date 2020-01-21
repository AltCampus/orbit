import React from "react";
import { Link } from "react-router-dom";
import { Card, Progress, Descriptions, Icon, Typography, Button } from "antd";
const { Meta } = Card;
const { Text } = Typography;

const TaskThreeProgress = ({ quiz, loading }) => {
  return (
    <Card
      className="ant-card-quiz"
      cover={
        <img
          alt="example"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAToAAAChCAMAAABgSoNaAAAAt1BMVEUBFCL///8AAAD///0BFCMAFSL//v8BFSEAABUAABMAAA/9//8AAAoCFCEAESAAABfo7e60tLcACRsAAAacn6EACBwAABng4+VGS1Dz9vcADBsADB7v8vOKjpFwdXm9wMOTl5nHyszX29w5P0V6foIZICmhpqnP09VtdHeOkZRdY2hWW2EjKDGpra83PURKTlQtMznAxccOGCEVICwmLjZeYWUxNztRWF0SHCU9RE0AFh2BhIZqa3FXOPtpAAAcG0lEQVR4nO1dCXfiuLK2y7IN3iAQwg4JIRDS2ScJnZv8/9/1VBKL5U0LTua8c6buzHTf7mAXn0ql2mXZ/5EhWf82A/9/6T/ojOk/6IypHugc2w53v8sQ/2OP/nktL9JgKU1FrJ38hpqlztv9a4eU6n20OlFUPEd8/Q6qMPUHJ7+mLugqFrKeNdag0K56If5dLfzUAt2e07C/frjczO6eBoPrweDpbnl5Pl/0dz9Tx4vUKNy/rH+1ulz+GVx/3N/c3DxfXz99byhDk5peU5fUtV823zFQioJGq8ep1Qwi/KPn2epqWNN7FGl4tbr9h766GzQuer3xOKH/G3U6Dc7Q9mveP/0dptCFju2hUsP17Z/dvlHMGgmx9hRbKRo1uwDXXy8cPtQ3dW9grmI9x8PnhlfTawpaY0ysInKtpBUA3Hw/9Bknxkr5BKkLQ2R0Pb0HaI6sYj6P1KHsDlb7xa79CMHDHBdk8nBHV7Ej48aykibAP9MFftSQG3OpQ9wWX38hGhNKUlZdyyKdLjyuJnalFjcjfhKFZ1uAC8ZMLGHH9ylD4wDup31TPWwMHdUnq2cIEsajHDmEDv87AvjzUv+hgcAtlnvcrDiWQRfHPsWPofd49itS5xx+6VNGR3LEMkQs123BzWpovk9KaP6E6+j7fCkV1hIXkq1nBxqbicFqmkCHwL1TRrWB2+M3BphO6GNqkb0Qj6uzG+iYskP1XgDL9s6WVydN6Php1L+DpsomrWR2OmTnm977i4kCNz6FG/pdKHgTzaXUlTqqVCbf0CDuSaxSXUPBu6znwLh6RuB8mXar5IYeGnQx9dZRf8NuqMS5qodDKfm+lcDfud7bi6h9B2P/BEYO5Mbd4EznzRrQMVVw9ReSUyWOEZ6BY9i2qeB5mkomTefQqIUd5Igu5nXfdjxUSwqbQR06fNzwlu6Nk5ScQK7VgBUVZTOFRwFffEB93CC1qBZhOqRe6Bz7qhnUyinVMAkM2mYnLUXu8pRjtZAIYYKnxJCOrvtCdRyfpI9F8lFfNkBLwxxpMgC+72sk+rgOPNhKnqI6dO1rILHr1qVZkFwLTdgxLPVxo1sAWtRpqHe/WricCdwqsaAEXcg5rZvLA8Ejtak0IhjoQF+CsUkupeitbTtSdlSlbgVJvVtDoBYsdEw86sN9w89xg77ZWq6AVaCjB8Ss5pMsSwkqPHXfYngd/Tw/Mm7UpO6dqrkfFDrG67kqdI7dvmkSqxY7uJCI5dKT9lImd1LoQmohfkY/xiYnXBfYKDng9Ef63U7tR2uacFmIBVMW3CnHTwqdZw+fgx/jMk3wJQcupPz0DYJdpvxUCZ58ww6fGz+7V3dEOK/Vu4SqXYqcYjjuNPJ9yk+VDpFv2Mem/xucMv0yRY+2ihtE7rT4kjL5LvJToUOk0G0jQn5OI6eIKi9CzwqJvpuMmO/1C4tJX4FnRTlVQYd757vrynMk9RF1giq2iOeEzy2rTn+mmnyL2iilpnql1Dn29EctzzwlVbYo1YODgLi/t5DUzaP8lMXEqqAL7bNfRs7yE2iXcONRTJfUMvd/RX0wijGyU8ZPtdQtftBPLGHW6jyX7A8qjA9A3N8DDsm1Om9lCqQcOsf2RvWErjWIbsbornjLOnQlMeal+0hqyaS1o952j2M3uj3kAdWgc6gFtW3qslkLwWpXk5HhyHsdG6m5OPbjPRl8nODRZRdE8EqlzrFXv63odpRAv1DuviNiBF0rStHY1dzy1DSD4rKoMuhCanua8FkH9e5z0NHDdQ6uiZXkNu5W5wdaPY61H+L2rguNzTLoPPujgxUtv2dEHYl0p1nsHHsIiVmEWpSZM93oWRxTsbssiiYWQxdiFFaDUc4OVjwlHV6P2A2arTH6mlSvswfpfG2CkU87pe+omfxuoHiRrc6nIDKebsiW6kefQFE5VJnUtbW2K9O/pEcxC56WX5cPDw+rzfL7jUIYHJKPyiqGOmSjD3S8U9DZL6axVjFm6dizpsGup/jntW8hdPTHtnqZCGJ1AJ4u15k63f786xlgjGUW6pYs3SIuPWVFh8zodKWLkHTDdEmVY69NVLiPDpkCdJg0edEzPpMItnNe7+rZaWFB+V19gPZmS2Ao8HoJJkdETEgwExM0jn1vEHlxkyhvLhVDF96MiLqYJNBkBWrUiHb2fIYs+RJyPbOYQaAXYyOBkGBsg5ldQpjWTH1r+ttzA7EjPj25VKDzVE06Ci/VcgGce7IYZfsLWkQrVgT9Q+SOKqjAKMxErPFbnhUjowt9WUcMtxfpOidsqvuuY1jKkzEU1/Y7JBqBP9J4P5aQ9sEs8uWiZ5KjP6jGdZ/Gdr4tg86jMq1kSuDru/e8CLyaGLhzaGiIDm61PXS3TYMva2HgGTLnFlaSzlHs9FwKDHRBtjamADonBLV6BAzrKqRibNYxhlbtVn2vEKt1t/+0sV8TH59x+G50AxiU8qJemsmho5pOviYMW5Z4rky4HVjmwn5JN62y+FA7NOT5c9MwRAxXWT7wn69AP4kb04e1RX1eBN1rogQd6UTFfnoFzdUjgD5f5tCZ6Pg1Ao3jQv76RpaOFWUO2Qx0IfOzVQpzidV7beu33awhUVV4MQyZkFwaJ9CDTXGm41qhmydPCYRCui4HnW0POpZC+pB0XnVLvvH5FDvVFXcxP0Y/MjINVROq2QtzMg9mynMXuCuBjlkCSk7TuKnfaYA5LZQ7BTZdK3YTH7/5HEyzEa2tXXz4D8EkTu9TTza9EFnoPFSiMoqL4pG8BPfgTrDfFNrJV6B6VFAt71Fv2iTZT/D4n5dlxGdNE/V5tJcKocNDQukpV9n1ZPZHbnvk94unvl+aM9uemG0ugqtb4uKEdPWMHhoIB0UOOrWnspKuzCd5c+Di4ev7z9P2e7m6Kml39uylIudJEKJPaLhhg69S6Owbo+qLJKiEbqlgRLnBtkDNUTZfbgOAoNHodBpNwP7XYvTCD8XKc3ixBz0sdDch3F6FBgD9Q5NTm9C9tq6CTkGJu3GAAabUknIcz26glTAnH5UTIaTXhVnbzn6BEPMesZJn1ZoNgSXhtSm2Otf2vm2XBU+Oa03/D8YAtG27GAW5HDqFSCCJId+g5NmLR8i3jJMmVgvltjaLv0lZj2PSnRs6YbHFavj3LwyFliB6djz1DFK6GIg5GooidI49jaS7w7/YZjcCqyjvFJ6EBN5ygX36489jBWHyyegf4/oDEHMb38fX7+1+AxWazhFlobvuyKHL5SUpj3+AAle0jrHVo0LqOZmfv1LxrtAIMi0Hw9M59cKJYFhQUyBKTGy77uooBZkNOwF5u2ZzmbOFw09eUV7wPWPsWnvI/HjIfBY5xcRc6NaprYHB20yMZ9k0WZTW3XHHZqCbS9QnoaedGANjYZxPSfwcIyyZPb6WOAkU8nEE0AA+XyDWywi72fDwY6clao0FGNXAw/EJGeimQTV0ru82ZnQR0zg49jaKq7+Yn7eg7c9RJdrECl7PUTP0N9DTt06658LL+uCKZ5tnP4+MoDsqqwx0g56kOiG2Mh4YVcYbsFy3OtiS5MO1sto9+A53Znb7uemqh/kYZcPD04A0hLAnbmGDHeumegEz0EHiV+ee3M5A/ISH9oy0AcRtPIkfC+2w2oKEg5qnOv1tpLddrda7na4esAOfWCAOR5qYFA/66KIUQodRE0najqp8cbyZfT+OZUaay6pyRejs7yq/pbfP/7MwAt1vOmUcPgYOjjlETCsjdA/i++8a6o/ck98bFECHr6KnhIxFyA62ugSlRB8GCtNy4NmV1i5zebxdMMZTcg/3RMj/ktfU0tJ/GEp0vwiBzyuTHZuMwmLoziPZ6uaqL+i+UwsKYcRA+OSwgnU026lkLLbPyxCN/7VOTNxPhzgweTrhb8raoyYx1JQSFaG7lclwHIknl82S6UrQJX7oiAdzhWnXwHoHJ4TmGFiGYqiT/vetdO10uC+ydKN0xxxlZWMSuT9miizhHXI7VbA0ke5HqlY5vKTFDk/m8qBqcInigg510vRwd+tARzqD9Jsc+2OM7d7++CbFd4ia3WDHHm0cS3jYvVSEs6qOWpaqjQyN28yOnQMpU60cugU1m5O/XOp8lw8sU3hZ2oJAz2XBwtJxvIsZHU8PKim6hYpWdGjgSUGHlZOyT44ebVHX6wg9ZKDrl0PX4mXsNy0CG/wd9T2o4Cg67EkgFujsUwaZGiDboC0kJs3DM6z0O6TQWdSuFKullFzRHediaB8rLEuhS5oh1ji0R6jq6Au/G+QCR0WCShqQIpQOD4f+fi/RU15YPU8/w0sah5kKAnTyCoVgY4tqRN2upPslO5WDfqcy3lkikWI3t3dK7+L9ZT6fv2w78i2LS5Ri8uUAEE/0pBhYaqd3yNElSJ2wjkJeAl3D9Ls1ykF8grgL9NkphY6wsglWkenZw1Hi85MtVHhf5xnndh7f8t7aSWps9bZiPbWWzcP5Sg5nTQo6XB/ZJwXB4faWKsVWIxVuZDRrlpeNjW6G+yLH9n3PYkauYz/Q46IyshNb2cIwwXykVplgILzp9iO5SVQAXVht3/NXX4nQacS/Yyvr/mLMrIxz3wXu9XpUmXdcK9ow6J4lvess/ToUNobg5ouweugDKH8BRi45hJ30oBNTQo6nc0ZR6B6z0AWl0BGY8fMIFd3I3ZXfr0HuubS+RX32mD7IOtfiKa+d5T0NusO7HY1sNEI3+shA91UOHfbdh1wy7HbQ6T0xFG8VXNlMYdhC9HboEggR7j+aM4OMoWN8pZeNnl50i4xbzYBSszXG8xajKITk7I6YsPSeCF3xMRH7XbQvPDwl8D/tV158X+X17inl+bMazmnkHrvrYl84qkKu3nVOihOgmwvj8+kJe9EFuL9bfk2nX8vvxxFAt5W4fLqt+D190snE7Kiu84v5Hj3vZYb/MnkNj75o9Vc7WvscOhgn4yMl45HAvxOO9CYZmkMXrbJ23Xa1SPtmk/XqzocoyccE/JQhnoIuT/FOL1ATfYCGWIhTatj2fZOXO5C058++UpymVz+9nx1W4lkLdHLjBNc0bajbQ/5RSrzkhMvK5h9oZBsvXCstEIzeL4qhGz9y5G6aaEYfLjlYKxj/F39Sugwz12GWBEcD941WXYabNAqhk5vEKDgCdJmOPc4dfs0ZE730SzF0ItJbcfeS271kaeZZFPt8BkW4C+tKq019zPmmpcrJXG7iCaraoQL9oRW8T6XaBPdf7hv0sqZZnvasTS67HLzd141zlfh2UFwAQBBjx+Geg3uYNRLC2GWjDCqIgK1LD6BTQRH3DgpbL3JiJfeKDKE0hjiH93iGjp8zP9OGksJb6oR6ITMrUEXCZsfeImClCVXYBfl+JBkNtdI7ceuQbtKELi85JcR1yuQWRodGG8gGmEt0V8wSE+GuI8nfRw2w4+ce5bRi05KSXvMKcqrTSxly/aKgEyo7adceyemrUujYlRz2+m2PTwZ1CuyqxAtiZwPV4G/oB/jRfoegHA+qTwoWHtYrcPZQw6trOz86uHLpZGKoEH0Lsr3lBV367Bd2BQqq9ymM0N6IWXul8MG7Vgl0zS8G3QKoGwHXoWMf27NuK61ixFwLONZMONLotfULA+welV1pWofaDRLmcn+9/hvE2F45SUMXMmu05C17j6D//TjgDQBOfx8mrRqVREB/ODT2EKnHAOJUvNYSnnIuC5fnG9bScVd210i+U2H4Dj4fPSD8VUXACrPN+8ei0nTsLRuEyoYllfLoZgPoStDtGh+VoRsWZf8duTvhxrmCL9tp9xdXV+t+e7iDL8ebfQmNrFXjVHQZxFiistv4/AErYIOyQszNlu4MNxvBV8NOq1t/fBwkkg51MsOuegGI38s6oo49AE6j59lD/oTD5mx7jtXHaXmk2qG86Ta2Wh9DO+UtUzeHwjnnZcilH6PWj3b7EONKI3R2sS2pOVFINeD5L7SE0w15M3ZdbFQYNwFev3ZxqeqGRVmUtPm280XxVQ94NhA2GHAyKjMCYreb7RvOOWE7ZyfX30G/tmKtd7Qpg04hwYVnrAgdk4S9tCYR3J8PCzauSA5W9VcQ6cDlLqywfgJ+RxMOMfxoleWyfSFHXPl2J3uYLQNV6FLGWUFpYjW5mWOMCdciNUCTYDXmUtruKcmo0C8SwWB5Of0eAccY3SX42yoPrzXu7GNbE0YP2uU0FLlbqKZ30oGZgoLYSsIpaVmvAH0k2Ctvbu43ecNEBUnkm8lArxkErWTXbY6XuFRWZYt5E8e+hnLK5uZkOY89JaPjZzLQyeKwru8TcQYJWiOY/b5mn3Qx0kRwIH+z+qoaqpklwR4Ss2vS3EPsiiX/ywv5sKIk/cY2sEIL7H85/Mqm2RERAUarrpp9kq6Lz7acXCtM2gq+CvomqAHS5DmX3QgnN2qeFbZ94jiUIZrDMm5xeLmaNLhUJlMKnNFlVPpFCOsOTH+HoULPvuWzLHxZ8b+9UbnHpNjJbn8DJtN3n3djN4FB4Q96nn2nNmDbHz0q9sG5mYkQWGxatjT0wGneZm5FUCzxhMnxHflGJyl0MdYnihRywcMb7YIO00eE3c/pb4pPOsVEmk+lQ+knfcvtPNnClbnr8mJT1s47dIQpWWrvwVxkSaMTfUYk7Y+h1kFOzTLokO+r6eCGa+K3O7yXszCMsVBobGHUmKkVtfjMLXfSwfNZs7K+WWxGp3C8ylUDId3zlGGWg26mkuYg3CvKoseLf8NJu7/zynDIUx65Nt78tbveUxLzneNOUrAb4mTEg1yMj5AVp5RCx8baZXLZCmYZiYnQ+JCDTiV3wvsgDJweTg9/IRjR89IlEuHDVuK5UsFtnG633BWUV1NWX8uTC8QX49z5sQmxUry5+Wx6/RfSevrJNrVEwpsY4lOpWnUt0fN37D+t6o+RSAw8eva1zJEivtgClO/9l0sukt/4NEaOtym2F+uFZEQDq3BRqvvvPIpatS0FfPxXgJp1D0kbH4SAW6ap0/FUS+b8QJ4cKyHmgTMleF75Dcf/8FpYFXMpEwo771qyfS7ksukBMwwkdQBxSxw2XTCYCLvt5cxSy/h6j4Cx1jsvNVsJpmD5/rjuSdlJxMIwT55k8f3cqKxZw6+cEocToqrmnNgKfuyeWGDomPPXppBCV1okxgvlFGd7oH+UXr+Fwlcg2WL8NVQ3eWU9vaJxWMqTLDqs8Mn4ZuYq6LDlZslnWCqYdkLZX2UA+khudpPbN9U7Njt6tXgIm1p2DQUDU8amd5RKoOPxHbxVsithJDdWciSfhRa7uZq1VTk3FiuqF2WkcPSf8my8mE9NPLQWlyo9h42OzUwJqtywfvNQeTyE8kp3Rq3vM4E2KuE3atA8iB+rhI7FqEPJMYEHn3pisgPL43XqZdDRv17CeXZfV0Ln7mxW/NC0i1GLCiZaYjRO9fKuTBCvPB1IYpdAdpZr0YRYW2fMKU6IvRwWBK0FWkVBAo3Vvq9aDp3f+uaKAD+CUcRK6FwklDS9axHUP0bcXNlHySBxjfsScOI0BNO2fRC9rMDZw/NXSNjl18FGjB2XQ+fuI9lsSS61qqUNL2Kt/FgS5DR6oa5zdMZFYc4gNQ07S+HLN3THMYbHY7x2/ekhZZKXQ0ePV2+nAzCu9irlx+UypH+BrdLH/IKSjJIZ7C/wP0t1ijAXdqputucLEb7hYnUXQTNl1rNZ7YPNy873XnVLtiHauGkZPjMbr1kTuXGnIMVbNvl/q3+xOU6/gr/fX5cPc3pabZZ3MVW9jQKt2cFbFV4/32dPhU2ksUVyjpU9+LmLfRUo1xlYBV0bYs37/ti9CWTcCqIuv2/iIiGFkhvziyl6rUan8DTC+6ifRWPRM2v7rY2yVVqV0OlPeY/37ar4G3+nPoqOLvb3Pke68EGxVbDIm3/tvho8I4aO+oa17cfK7HyeiFvQ6VsiKnFlV7B7KIHdE55c90YTcU8nl3WLOKEGdP3fvSnuwCfryiwwEfuGFyecSjGJim9kL73RyVF2ZWvl03LZ8NkiOv93TlkyvikOb5RD59jvktlYP0A+P12LYveO/VTY3PPTxO9I0oGO/jt8Hf3gZd0ljJIoG4I8YDcsLRD7ScIW2sLYkOS6yd/WzL518VbmDDtKEcxaifpA3e+ycGT11bpnqrnmusituFSU9a//qvql2qrxWHR/oxQ67CaFX7zJ1iqcsn0gVL8bvWa4Eym2xsGktMqxGjrH/v7dPYIWVAU79Oj6VX7KDns5dPg1nn7zmMUOgTLVssu9bVXjmDXQ/nrpYrmTX15/3cRKQ5XbO06lWOmmns/gF1ixeDXdvKomWQodxe531pl6rvKOEZwGgPwYXZKrRyRhbczl2T4pdIxXVzIBthZW4asqRL+DDvn5jJSnl51ACY9ungAd8jqgvP60hYd5SaUCIMrP9hfszQTH7VUmXOTQIf3ZnWs/xHFM/S+8AVuFFdZswM7ZnxQ80tn1pJ0Mnf3FbdEf27bjgssEJPxoTirWIUKar/J7vpSgc/B+y4QqmJ/xaAlpBSUudik/D5D8XAyKwPWw3ErSgo4PaGtYJrPyZcRiJY/lNnsxP1hco589USQXj3p5KY3ihqUPmjz+iCGP6VntNlbW5DL4ocOiw++AlmpeRegYfUES12uOxrHrtjTV3I48TFeM4rK7GozJh3vF0Qs60NnrICB1WqOscmAwMSuVohth/TcwvbOogFAq3DEoj/vQgA53/y0o9qGpUOyTFhatmdVzM+W4BPUxqzLChgS4WStrXR2pw2de3deo8cbw3rYzs4I0CD+4fjYZ4F9ILmlgKk55IXWg4+OasI3udJOKNRu9vrDaPBOhY3uctXmtINK9AyXLCWtcdEewbYs3yFeTlq7jNLyFFgaPT7LyCImw7MozrQhN8/MFwQl5T55xJyP4uNIrKDeAzrb7f6iR55ueFzgWMIlgOtSz5UoI45/tGQTJruHVgCjqI3ibS5vuM2QAHev2vwPJTURVlEA0HbKIudFmFblhT2gvQXa/TwnFVOIu4HGeepgiGUkdUv8LzE43eqr+XQ2xMt3jt3ueSLyBxZ6cR1Ay6KiaxhFs1zvvQYsZU+gwkvVwDcE4PY1fVhZId0YH4O7K1tHGyvzY8y1EHa4Q8D+l+sRHXYMGKiH0UL3BStPdsfor0HFabAKIGHqsKq6I2LjYmON60YVHvLyzhrOhgHAM7/kHdC94k79VGujBGjVCrbhxADC7Ck27jU6BjinVxeaDFSBSfguFzvf5tALkc7tq2z8F3P5WzvbDFiDoEVZMVcSQ6+KQ3aQB8PZ1xb6FYYvlaVLHqX02GwFAs2QyWNLBu2Ifpy+8b+n0k6GEwnCnBoZXU5yVFPQKPZ+k04oARrfHGUqGHJ0G3TEy0766vHvEcs4oaDRavV6n02o1mgH+SXy9XK3Dwwd+jDzWB+55uym1D9OnN94OETQbSM0AC3EhuZ6dX/ESA8/jMfTf37A5GravzlZfs9n79vNz8Od7Nps+zNeTn5IyNYbmD5dfs1tKs+V0dTZfTGrTF7VC94MiZURF4qRn9lZRndCxm+u54vAYheFJTZ/1MIW88N+yMUBhbbq2XqnjVQZp+lehC3f93uGRnRqpVugYpXCqb4XNKDepu9an/x9tNqtOFZX3IgAAAABJRU5ErkJggg=="
        />
      }
      actions={
        !quiz.reachedStage
          ? undefined
          : quiz.submitted
          ? undefined
          : quiz.onGoing
          ? [
              <Link to={`/task/3`}>
                <Button type="primary">Resume Questionnaire</Button>
              </Link>
            ]
          : [
              <Link to={`/task/3`}>
                <Button type="primary">Start Questionnaire</Button>
              </Link>
            ]
      }
    >
      {loading ? (
        <Icon type="loading" spin />
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <Meta title="Progress" />
            <Progress percent={quiz.submitted ? 100 : 0} size="small" />
          </div>
          {!quiz.reachedStage && (
            <Text>You've not reached this stage yet.</Text>
          )}
          {quiz.submitted && (
            <>
              <Descriptions></Descriptions>
              <Descriptions>
                <Descriptions.Item label="Start Time">
                  {new Date(quiz.startTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>{" "}
              <Descriptions>
                <Descriptions.Item label="Submission Time">
                  {new Date(quiz.submittedTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
          {quiz.onGoing && (
            <>
              <Descriptions>
                <Descriptions.Item label="Start Time">
                  {new Date(quiz.startTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>{" "}
              <Descriptions>
                <Descriptions.Item label="End Time">
                  {new Date(quiz.endTime).toLocaleString()}
                </Descriptions.Item>
              </Descriptions>
            </>
          )}
          {quiz.canTakeQuiz && <Text>You're now eligible to take questionnaire</Text>}
          {quiz.failedToSubmit && (
              <Text>You've failed to submit questionnaire on time</Text>
          )}
        </>
      )}
    </Card>
  );
};

export default TaskThreeProgress;
