// تحديث التاريخ
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('date').textContent = today.toLocaleDateString('ar-EG', options);

    // مؤشرات الأداء مع المستهدف
    const indicators = [
      { title: "صافي نقاط الترويج NPS", value: 84, target: 80 },
      { title: "رضا العملاء CSAT", value: 4.75, target: 4.70 },
      { title: "الحل من اول محاولة FCR", value: 88, target: 90 },
      { title: "جهد العميل CES", value: 1.91, target: 2.00 },
      { title: "مشاعر العملاء CS", value: 18 , target: 20 },
      { title: "عدد المكالمات الواردة", value: 8214, target: 8000 },
      { title: "مستوى الخدمة للهاتف المصرفي", value: 94, target: 95 },
      { title: "معدل المكالمات المفقودة", value: 2, target: 5 },
      { title: "مستوى الخدمة للعناية الاكترونية", value: 94, target: 90 },
      { title: "مستوى الخدمة لاقفال الطلبات", value: 96, target: 95 },
      { title: "مستوى الخدمة لاقفال الشكاوى", value: 94, target: 95 },
      { title: "مستوى االاداء للتطبيق", value: 4, target: 5 },
      { title: "الشكاوى الواردة", value: 880, target: 1000 },
      { title: "الطلبات الواردة", value: 1211, target: 1500 },
      { title: "مستوى الخدمة للتمويل الشخصي", value: 94, target: 90 },
      { title: "مستوى الخدمة لتمويل السيارات", value: 93, target: 90 },
      { title: "مستوى الخدمة للعقار", value: 90, target: 90 },
      { title: "مستوى الخدمة للبطاقات الائتمانية", value: 88, target: 90 },
      { title: "معدل التوفر للصراف الالي", value: 99, target: 95 },
      { title: "معدل التوفر للتطبيق", value: 97, target: 95 },
      // إضافة مؤشرات إضافية حسب الحاجة
    ];

    // تصنيف اللون بناءً على القيمة والمستهدف
    function getKpiColor(value, target) {
      if (value >= target) return 'green';
      else if (Math.abs(value - target) / target <= 0.1) return 'yellow';
      else return 'red';
    }

    // توليد العناصر
    const kpiGrid = document.getElementById('kpiGrid');
    indicators.forEach(ind => {
      const div = document.createElement('div');
      div.classList.add('kpi', getKpiColor(ind.value, ind.target));
      div.innerHTML = `<div style="font-weight: bold; margin-bottom: 0.5rem;">${ind.title}</div><div style="font-size: 1.1rem;">${ind.value} / <small style="color: #666;">${ind.target}</small></div>`;
      kpiGrid.appendChild(div);
    });