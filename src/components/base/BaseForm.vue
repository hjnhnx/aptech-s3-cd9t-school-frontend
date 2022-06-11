<template>
  <Form
    :validate-messages="defaultValidateMessages"
    layout="vertical"
    v-bind="$attrs"
  >
    <Card class="mx-auto max-w-4xl">
      <div class="grid gap-x-4 gap-y-2 md:grid-cols-12">
        <slot />
      </div>
      <template #actions>
        <slot name="actions">
          <Button html-type="submit" type="primary">Submit</Button>
        </slot>
      </template>
    </Card>
  </Form>
</template>

<script lang="ts" setup>
import { Form, Card, Button } from "ant-design-vue";
import { defaultValidateMessages } from "@/utils/validate";
</script>

<style lang="less" scoped>
:deep(.ant-card-actions) {
  padding: 12px 24px;

  > li {
    text-align: right;
    margin: 0;

    > span {
      display: inline-block;
    }
  }
}
</style>
