
# Useful Docker Swarm snippets

```
"Docker swarm constraints": {
		"scope": "yaml,yml",
		"prefix": "deploy",
		"body": ["deploy:",
      			"mode: replicated",
      			"replicas: 1",
     			"placement:",
        		"constraints:",
          		"- node.role == manager",
		  ],
		"description": "description"
	},
```

```
"Update policy":{
	"scope": "yaml,yml",
	"prefix": "update policy",
	"body": [
		"deploy:",
		"  update_config:",
		"    parallelism: 1",
		"    delay: 10s",
		"    failure_action: continue",
	],
	"description": "description"
},
```

```
"Exclude autoupdate and enable DIUN":{
	"scope": "yaml,yml",
	"prefix": "disable autoupdate",
	"body": [
		"labels:",
		"  - gantry.services.excluded=true",
		"  - diun.enable=true",
		],
			"description": "description"},
```

```
// "Traefik labels":{
// 	"scope": "yaml,yml",
// 	"prefix": "traefik",
// 	"body": [
// 		"labels:",
// 		"  - traefik.enable=true",
// 		"  - traefik.http.routers.${1:router}.rule=Host(`${2:host}`)",
// 		"  - traefik.http.services.${3:service}.loadbalancer.server.port=${4:port}",
// 		"  - traefik.http.routers.${5:router}.entrypoints=${6:entrypoint}",
// 		"  - traefik.http.services.${7:service}.loadbalancer.sticky=true",
// 	],
// 	"description": "description"
// },
// "traefik+tinyauth":{
// 	"scope": "yaml,yml",
// 	"prefix": "traefik+https",
// 	"body": [
// 		"networks:",
// 		"- proxy",
// 		"deploy:",
// 		" labels:",
// 			"- \"traefik.enable=true\"",
// 			"- \"traefik.swarm.network=proxy\"",
// 			"- \"traefik.http.routers.${1:servicename}.entrypoints=http\"",
// 			"- \"traefik.http.routers.${1:servicename}.rule=Host(`${2:subdomain}.paget.dk`)\"",
// 			"- \"traefik.http.middlewares.${1:servicename}-https-redirect.redirectscheme.scheme=https\"",
// 			"- \"traefik.http.routers.${1:servicename}.middlewares=${1:servicename}-https-redirect\"",
// 			"- \"traefik.http.routers.${1:servicename}-secure.entrypoints=https\"",
// 			"- \"traefik.http.routers.${1:servicename}-secure.rule=Host(`${2:subdomain}.paget.dk`)\"",
// 			"- \"traefik.http.routers.${1:servicename}-secure.tls=true\"",
// 			"- \"traefik.http.routers.${1:servicename}-secure.tls.certresolver=cloudflare\"",
// 			"- \"traefik.http.routers.${1:servicename}-secure.service=${1:servicename}\"",
// 			"- \"traefik.http.services.${1:servicename}.loadbalancer.server.port=${3:port}\"",
// 			"- \"traefik.http.routers.${1:servicename}-secure.middlewares=tinyauth\"",
// 	  "networks:",
// 	  " proxy:",
//       "  external: true",
// 	],
// },
```

```
"traefik": {
	"scope": "yaml,yml",
	"prefix": "traefik+https",
	"body": [
		"networks:",
		"  - proxy",
		"deploy:",
		"  labels:",
		"    - \"traefik.enable=true\"",
		"    - \"traefik.swarm.network=proxy\"",
		"    - \"traefik.http.routers.${1:servicename}.entrypoints=http\"",
		"    - \"traefik.http.routers.${1:servicename}.rule=Host(`${2:subdomain}.paget.dk`)\"",
		"    - \"traefik.http.middlewares.${1:servicename}-https-redirect.redirectscheme.scheme=https\"",
		"    - \"traefik.http.routers.${1:servicename}.middlewares=${1:servicename}-https-redirect\"",
		"    - \"traefik.http.routers.${1:servicename}-secure.entrypoints=https\"",
		"    - \"traefik.http.routers.${1:servicename}-secure.rule=Host(`${2:subdomain}.paget.dk`)\"",
		"    - \"traefik.http.routers.${1:servicename}-secure.tls=true\"",
		"    - \"traefik.http.routers.${1:servicename}-secure.tls.certresolver=cloudflare\"",
		"    - \"traefik.http.routers.${1:servicename}-secure.service=${1:servicename}\"",
		"    - \"traefik.http.services.${1:servicename}.loadbalancer.server.port=${3:port}\"",
		"networks:",
		"  proxy:",
		"    external: true"
	],
	"description": "Traefik configuration with proper indentation"
},
```

```
"traefik+tinyauth":{
    "scope": "yaml,yml",
    "prefix": "traefik+tinyauth",
    "body": [
        "    networks:",
        "    - proxy",
        "    deploy:",
        "     labels:",
        "      - \"traefik.enable=true\"",
        "      - \"traefik.swarm.network=proxy\"",
        "      - \"traefik.http.routers.${1:servicename}.entrypoints=http\"",
        "      - \"traefik.http.routers.${1:servicename}.rule=Host(`${2:subdomain}.paget.dk`)\"",
        "      - \"traefik.http.middlewares.${1:servicename}-https-redirect.redirectscheme.scheme=https\"",
        "      - \"traefik.http.routers.${1:servicename}.middlewares=${1:servicename}-https-redirect\"",
        "      - \"traefik.http.routers.${1:servicename}-secure.entrypoints=https\"",
        "      - \"traefik.http.routers.${1:servicename}-secure.rule=Host(`${2:subdomain}.paget.dk`)\"",
        "      - \"traefik.http.routers.${1:servicename}-secure.tls=true\"",
        "      - \"traefik.http.routers.${1:servicename}-secure.tls.certresolver=cloudflare\"",
        "      - \"traefik.http.routers.${1:servicename}-secure.service=${1:servicename}\"",
        "      - \"traefik.http.services.${1:servicename}.loadbalancer.server.port=${3:port}\"",
        "      - \"traefik.http.routers.${1:servicename}-secure.middlewares=tinyauth\"",
        "networks:",
        "  proxy:",
        "    external: true"
    ],
    "description": "Traefik configuration with TinyAuth middleware"
},
}
```