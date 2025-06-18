// تحديث التاريخ
const today = new Date();
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('date').textContent = today.toLocaleDateString('ar-EG', options);

// مؤشرات الأداء مع المستهدف ونوع المؤشر
const indicators = [
  // مؤشرات تصاعدية - كلما زادت كلما كان أفضل
  { title: "صافي نقاط الترويج NPS", value: 84, target: 80, type: "ascending", icon: "fas fa-chart-line" },
  { title: "رضا العملاء CSAT", value: 4.75, target: 4.70, type: "ascending", icon: "fas fa-smile" },
  { title: "الحل من اول محاولة FCR", value: 88, target: 90, type: "ascending", icon: "fas fa-check-circle" },
  { title: "مستوى الخدمة للهاتف المصرفي", value: 94, target: 95, type: "ascending", icon: "fas fa-phone" },
  { title: "مستوى الخدمة للعناية الاكترونية", value: 94, target: 90, type: "ascending", icon: "fas fa-comments" },
  { title: "مستوى الخدمة لاقفال الطلبات", value: 96, target: 95, type: "ascending", icon: "fas fa-clipboard-check" },
  { title: "مستوى الخدمة لاقفال الشكاوى", value: 94, target: 95, type: "ascending", icon: "fas fa-tools" },
  { title: "مستوى الخدمة للتمويل الشخصي", value: 94, target: 90, type: "ascending", icon: "fas fa-money-bill-wave" },
  { title: "مستوى الخدمة لتمويل السيارات", value: 93, target: 90, type: "ascending", icon: "fas fa-car" },
  { title: "مستوى الخدمة للعقار", value: 90, target: 90, type: "ascending", icon: "fas fa-home" },
  { title: "مستوى الخدمة للبطاقات الائتمانية", value: 88, target: 90, type: "ascending", icon: "fas fa-credit-card" },
  { title: "معدل التوفر للصراف الالي", value: 99, target: 95, type: "ascending", icon: "fas fa-university" },
  { title: "معدل التوفر للتطبيق", value: 97, target: 95, type: "ascending", icon: "fas fa-mobile-alt" },
  { title: "عدد المكالمات الواردة", value: 8214, target: 8000, type: "ascending", icon: "fas fa-chart-bar" },
  
  // مؤشرات تنازلية - كلما قلت كلما كان أفضل
 
  { title: "جهد العميل CES", value: 1.91, target: 2.00, type: "descending", icon: "fa fa-chart-gantt" },
  { title: "مشاعر العملاء CS", value: 18, target: 20, type: "descending", icon: "fas fa-frown" },
  { title: "معدل المكالمات المفقودة", value: 2, target: 5, type: "descending", icon: "fas fa-phone-slash" },
  { title: "مستوى االاداء للتطبيق", value: 4, target: 5, type: "descending", icon: "fas fa-exclamation-triangle" },
  { title: "الشكاوى الواردة", value: 880, target: 1000, type: "descending", icon: "fas fa-file-alt" },
  { title: "الطلبات الواردة", value: 1211, target: 1500, type: "descending", icon: "fas fa-envelope" },
];

// تصنيف اللون بناءً على القيمة والمستهدف ونوع المؤشر
function getKpiColor(value, target, type) {
  let percentageDiff;
  
  if (type === "ascending") {
    // للمؤشرات التصاعدية: الأفضل هو القيمة الأعلى
    percentageDiff = ((target - value) / target) * 100;
    
    if (value >= target) {
      return 'green'; // حقق المستهدف أو تجاوزه - ممتاز
    } else if (percentageDiff <= 5) {
      return 'yellow'; // قريب من المستهدف 5% فأقل - مقبول
    } else {
      return 'red'; // بعيد عن المستهدف لأكثر من 5% - ضعيف
    }
    
  } else if (type === "descending") {
    // للمؤشرات التنازلية: الأفضل هو القيمة الأقل
    percentageDiff = ((value - target) / target) * 100;
    
    if (percentageDiff <= -5) {
      return 'green'; // أقل من المستهدف بأكثر من 5% - ممتاز
    } else if (percentageDiff > -5 && percentageDiff <= 5) {
      return 'yellow'; // قريب من المستهدف (±5%) - مقبول
    } else {
      return 'red'; // أعلى من المستهدف بأكثر من 5% - ضعيف
    }
  }
}

// دالة للحصول على رمز الاتجاه
function getDirectionIcon(type) {
  switch(type) {
    case "ascending":
      return "fas fa-arrow-up"; // سهم للأعلى للمؤشرات التصاعدية
    case "descending":
      return "fas fa-arrow-down"; // سهم للأسفل للمؤشرات التنازلية
    default:
      return "fas fa-arrow-right";
  }
}

// دالة للحصول على وصف النوع
function getTypeDescription(type) {
  switch(type) {
    case "ascending":
      return "تصاعدي";
    case "descending":
      return "تنازلي";
    case "volume":
      return "حجمي";
    default:
      return "";
  }
}

// توليد العناصر
const kpiGrid = document.getElementById('kpiGrid');

// تجميع المؤشرات حسب النوع
const ascendingIndicators = indicators.filter(ind => ind.type === "ascending");
const descendingIndicators = indicators.filter(ind => ind.type === "descending");

// إنشاء عناوين للمجموعات
function createSectionHeader(title, icon, description) {
  const headerDiv = document.createElement('div');
  headerDiv.className = 'kpi-section-header';
  headerDiv.innerHTML = `
    <h3><i class="${icon}"></i> ${title}</h3>
    <p>${description}</p>
  `;
  return headerDiv;
}

// إضافة المؤشرات التصاعدية
if (ascendingIndicators.length > 0) {
  const ascendingHeader = createSectionHeader(
    'المؤشرات التصاعدية', 
    'fas fa-chart-line', 
    'كلما زادت القيمة كلما كان الأداء أفضل'
  );
  kpiGrid.appendChild(ascendingHeader);
  
  ascendingIndicators.forEach(ind => {
    const div = document.createElement('div');
    div.classList.add('kpi', getKpiColor(ind.value, ind.target, ind.type));
    div.innerHTML = `
      <div class="kpi-header">
        <i class="kpi-icon ${ind.icon}"></i>
        <i class="kpi-direction ${getDirectionIcon(ind.type)}"></i>
      </div>
      <div class="kpi-title">${ind.title}</div>
      <div class="kpi-values">
        <div class="current-value-container">
          <span class="value-label">المحقق</span>
          <span class="current-value">${ind.value}</span>
        </div>
        <div class="target-value-container">
          <span class="value-label">المستهدف</span>
          <span class="target-value">${ind.target}</span>
        </div>
      </div>
      <div class="kpi-type">${getTypeDescription(ind.type)}</div>
    `;
    kpiGrid.appendChild(div);
  });
}

// إضافة المؤشرات التنازلية
if (descendingIndicators.length > 0) {
  const descendingHeader = createSectionHeader(
    'المؤشرات التنازلية', 
    'fa fa-chart-gantt', 
    'كلما قلت القيمة كلما كان الأداء أفضل'
  );
  kpiGrid.appendChild(descendingHeader);
  
  descendingIndicators.forEach(ind => {
    const div = document.createElement('div');
    div.classList.add('kpi', getKpiColor(ind.value, ind.target, ind.type));
    div.innerHTML = `
      <div class="kpi-header">
        <i class="kpi-icon ${ind.icon}"></i>
        <i class="kpi-direction ${getDirectionIcon(ind.type)}"></i>
      </div>
      <div class="kpi-title">${ind.title}</div>
      <div class="kpi-values">
        <div class="current-value-container">
          <span class="value-label">المحقق</span>
          <span class="current-value">${ind.value}</span>
        </div>
        <div class="target-value-container">
          <span class="value-label">المستهدف</span>
          <span class="target-value">${ind.target}</span>
        </div>
      </div>
      <div class="kpi-type">${getTypeDescription(ind.type)}</div>
    `;
    kpiGrid.appendChild(div);
  });
}