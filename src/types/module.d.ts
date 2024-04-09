import type modal from '@/plugins/modal';
import type tab from '@/plugins/tab';
import type cache from '@/plugins/cache';
import type animate from '@/animate';
// import type { addDateRange, handleTree, selectDictLabel, selectDictLabels, parseTime } from '@/utils/ruoyi';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // 全局方法声明
    $modal: typeof modal;
    $tab: typeof tab;
    $cache: typeof cache;
    animate: typeof animate;

    // addDateRange: typeof addDateRange;
    // handleTree: typeof handleTree;
    // selectDictLabel: typeof selectDictLabel;
    // selectDictLabels: typeof selectDictLabels;
    // parseTime: typeof parseTime;
  }
}
