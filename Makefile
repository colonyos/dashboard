all: container 
.PHONY: all container 

BUILD_IMAGE ?= colonyos/dashboard
PUSH_IMAGE ?= colonyos/dashboard

container:
	docker build -t $(BUILD_IMAGE) .

push:
	docker tag $(BUILD_IMAGE) $(PUSH_IMAGE) 
	docker push $(PUSH_IMAGE)
